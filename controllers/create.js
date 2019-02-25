let Language = require('../models/Language');
let Salt = require('../models/Salt');
const hasher = require('../hepler/passwordHasher');
const mailValidator = require('../hepler/emailValidator');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) =>{
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
