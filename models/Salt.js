const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaltSchema = new Schema({
    name : { type: String, required: true },
    userSalt: { type: String, required: true },
    owner:{
        type: Schema.ObjectId,
        ref: 'Language'   // ссилається на model hero
    }
});

module.exports = mongoose.model('Salt', SaltSchema);
