// якшо користуватись google то треба в розділі безпека Ненадежные приложения, у которых есть доступ к аккаунту - ок , Включите опцию Использование IMAP и SMTP.
// ukr.net  - Перейдите в раздел Почтовые программы. Включите опцию Использование IMAP и SMTP.
const nodemailer = require('nodemailer');
const email = require('../constants/emailParams').email;
const pass = require('../constants/emailParams').pass;

module.exports = (userMail, userName, msg) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,
        auth: {
            user: email ,
            pass: pass
        }
    });

    let mailOptions = {
        from: email,
        to: userMail,
        subject: 'Тимчасовий пароль',
        text: msg,

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

    /*let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andriylegeta@gmail.com',
            pass: 'wa17da7609'
        }
    });

    let mailOptions = {
        from: 'andriylegeta@gmail.com',
        to: userMail,
        subject: 'Sending Email using Node.js',
        text: msg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });*/
};