let Language = require('../models/Language');
let Salt = require('../models/Salt');

module.exports = async (req, res, next) => {
    try {

        const token = req.get('Authorization');
        console.log(`Authorization token - ${token}`);
        if (!token) throw new Error('No token');

        // перевіряємо role  (user чи адмін)
        /*      const {role} = tokenVeryfiactor(token, secretWorld);
              if (role !== 1) throw new Error('You are not admin');*/

        await Language.findByIdAndRemove(req.params.id);
        let salt = await Salt.findOne({owner: req.params.id});
        await Salt.findByIdAndRemove(salt._id);
        res.json({
            success: true,
            message: 'User was deleted!',
            allUsers: await Language.find({})
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
