/*
 * Run using the mongo shell
 * localhost:
 *   mongo rypto-sonar-db init.mongo.js
 * Atlas Template:
 *   mongo mongodb+srv://user:pwd@<cluster-name>.xxx.mongodb.net/<database-name> init.mongo.js
 * Atlas Production:
 *   mongo mongodb+srv://admin:mVPn7sUKmnzTHvzH@crypto-sonar-db.l253g.mongodb.net/crypto-sonar-db init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

// empty users collection
// db.users.remove({});

// empty wallets collection
// db.wallets.remove({});

const API_ENDPOINT='http://localhost:3000/graphql'

const USER_QUERY = `
query{
    users {
      id
    }
  }
`;

// template arrays of randomized data to insert into MongoDB
const userNames = ["george", "bob", "jane", "sally"];
const userPasswords = ["pass1", "pass2", "pass3", "pass4"];
const wallets = [
    {"alias": "coach", "address": "0x7910609cF9DC8584385708fD9308907DB9644A3A"},
    {"alias": "batman", "address": "0x667a061a02f109518D210bfd11D14c083998Ad03"},
    {"alias": "ant", "address": "0x45F8c4F7714C17F53Dd2B1d4A7F6b4b1461a866A"},
    {"alias": "vlh dumper", "address": "0xd96622a9099d758f8d6664ae702a59e9d548ed23"},
    {"alias": "heimdall", "address": "0x8470f7749e599067dc49a7cfc3cd51240c22b5c6"},
]

