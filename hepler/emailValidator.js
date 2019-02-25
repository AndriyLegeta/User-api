/*module.exports = email=> {
    if (!email) throw new Error('Please enter email');
    const regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const  isValid = regular.test(String(email).toLowerCase());
    if (!isValid) throw new Error ('Email is not Valid')
    return email;
};*/

const Joi = require('joi');
const schema = Joi.object().keys({
    email: Joi.string().email({minDomainAtoms: 2}).required()
});
module.exports = email=> {

    const result = schema.validate({email: email});
    if (result.error === null) {
        console.log('ok')
    } else {
        throw new Error('Email is not Valid');
    }
};