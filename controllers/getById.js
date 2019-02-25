let Language = require('../models/Language');

module.exports = async (req, res, next) => {
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
