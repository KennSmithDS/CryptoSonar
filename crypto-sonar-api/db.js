require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDb() {
  try {
    const db_url = process.env.DB_URL;
    await mongoose.connect(db_url, {useNewUrlParser: true});
    console.log(`Connected to Atlas MongoDB at ${db_url}`);
  } catch(err) {
    console.log(err);
  }
}

module.exports = { connectToDb };