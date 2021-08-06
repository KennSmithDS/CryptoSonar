const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    alias: String,
    address: String,
    userId: String
});

module.exports = mongoose.model('Wallet', walletSchema);