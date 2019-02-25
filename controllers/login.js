let Language = require('../models/Language');
let Salt = require('../models/Salt');
const hasher = require('../hepler/passwordHasher');
const tokenizer = require('../hepler/tokenizer');

module.exports =async (req, res, next) =>{
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
