let Language = require('../models/Language');
const mailSender = require('../hepler/mailSender');

module.exports = async (req, res, next) =>{
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
