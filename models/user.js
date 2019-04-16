var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    map: { type: String }
});

module.exports = mongoose.model('User', userSchema);
