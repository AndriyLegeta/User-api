let controller = {};
let Language = require('../models/Language');
let Salt = require('../models/Salt');
const hasher = require('../hepler/passwordHasher');
const mailValidator = require('../hepler/emailValidator');
const mailSender = require('../hepler/mailSender');
const tokenizer = require('../hepler/tokenizer');
const tokenVeryficator = require('../hepler/tokenVeryficator');
const secretWorld = require('../constants/secretWords').secret;

const bcrypt = require('bcryptjs');


controller.getById = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Get one user!',
            allUser: await Language.findById(req.params.id)
        });
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

controller.getAll= async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        console.log(`Authorization token - ${token}`);
        if (!token) throw new Error('No token');

        res.status(200).json({
            success: true,
            message: 'Get all users!',
            allUser: await Language.find({}, {__v : 0}),
            salts: await Salt.find({}, {userSalt: 0,__v : 0})
            });
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

controller.create= async (req, res, next) =>{
try {
    let createSalt = bcrypt.genSaltSync(10);
    const userName = req.body.name;
    const hashedPassword = hasher(req.body.password, createSalt);
    const userEmail = req.body.email;

    if (!userName) throw new Error('Please enter username');
    mailValidator(userEmail);

    const email = await Language.findOne({
            email: userEmail
    });

    if (email) {
        res.status(409).json({
            success: false,
            message: `Mail exists`
        })
    }



   let newUser = await Language.create({
        name: userName,
        password: hashedPassword,
        email: userEmail,
    });

    let saltForPassword = await Salt.create({
        name: userName,
        userSalt: createSalt,
        owner: newUser._id
    });
    res.status(200).json({
        success: true,
        message: `User ${userName} is created`,
        createdUser: newUser
    })
} catch (err) {
    res.status(500).json({
        success: false,
        message: err.message
    });
}};

controller.login = async (req, res, next) =>{
    try {
        const userName = req.body.name;
        const findSalt = await Salt.findOne({
            name: userName
        });

        const hashedPassword = hasher(req.body.password, findSalt.userSalt);
        if (!userName) throw new Error('Please enter username first');


        const user = await Language.findOne({
                name: userName,
                password: hashedPassword
        });


        if (!user) throw new Error('User was not found');

        const tokens = tokenizer.accessAndRefresh(user._id, userName);
            res.status(200).json({
                success: true,
                message: `User ${userName} logged in`,
                user: user,
                token: tokens
            })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};


controller.update = async (req, res, next) => {
    try {
        await Language.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json({
            success: true,
            message: 'User updated!',
            allUser: await Language.find({})
        });
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

controller.mailsend = async (req, res, next) =>{
    try {
        const userMail = req.body.email;
        console.log(userMail);
        if (!userMail) throw new Error('Please enter email');
        // шукаю в базі юзера
        const user = await Language.findOne({
                email: userMail
        });
        console.log(user);
        // перевіряю чи знайшло юзера
        if (!user) throw new Error('User was not found');

        let msg = `Hello ${user.name} your temporary password - ${user.password}`;
        mailSender(userMail, user.name, msg);


        // віддаю їх на фронт
        res.json({
            success: true,
            message: 'Message with change of password sent to mail'
        });

    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};
controller.delete= async (req, res, next) => {
    try {

        const token = req.get('Authorization');
        console.log(`Authorization token - ${token}`);
        if (!token) throw new Error('No token');

        // перевіряємо role  (user чи адмін)
  /*      const {role} = tokenVeryfiactor(token, secretWorld);
        if (role !== 1) throw new Error('You are not admin');*/

        await Language.findByIdAndRemove(req.params.id);
        let salt = await Salt.findOne({owner:req.params.id});
        await Salt.findByIdAndRemove(salt._id);
        res.json({
            success: true,
            message: 'User was deleted!',
            allUsers: await Language.find({})
        })
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = controller;
