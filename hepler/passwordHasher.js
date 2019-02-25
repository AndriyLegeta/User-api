const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const secret = 'abcdefg';



module.exports = (password, salt)=> {
    /*if (!password) throw new Error('Please enter password first');*/
    console.log(salt);
    let pass = bcrypt.hashSync(password, salt);
    console.log(pass);
    /*let pass = crypto.createHmac('sha256', secret).update(password).digest('hex');*/


    if (!pass) throw new Error('Cant protect your password');
    return pass
};


