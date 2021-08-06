const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    userPassword: String,
    userSignedIn: Boolean
});

module.exports = mongoose.model('User', userSchema);