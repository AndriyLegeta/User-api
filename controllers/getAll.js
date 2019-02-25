let Language = require('../models/Language');
let Salt = require('../models/Salt');

module.exports = async (req, res, next) => {
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
