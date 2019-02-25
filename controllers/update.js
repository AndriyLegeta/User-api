let Language = require('../models/Language');

module.exports = async (req, res, next) => {
    try {
        console.log(req.body);
        await Language.findByIdAndUpdate(
            req.body._id,
            {
                name : req.body.name,
                email : req.body.email
            },
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
