/*
 * Run using the mongo shell
 * localhost:
 *   mongo rypto-sonar-db init.wallets.js
 * Atlas Template:
 *   mongo mongodb+srv://user:pwd@<cluster-name>.xxx.mongodb.net/<database-name> init.wallets.js
 * Atlas Production:
 *   mongo mongodb+srv://admin:mVPn7sUKmnzTHvzH@crypto-sonar-db.l253g.mongodb.net/crypto-sonar-db init.wallets.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

import fs from 'fs'; // this wont work with mongo 

// empty wallets collection
db.wallets.remove({});

// template array of wallet data to insert into MongoDB
const wallets = [
    {"alias": "coach", "address": "0x7910609cF9DC8584385708fD9308907DB9644A3A"},
    {"alias": "batman", "address": "0x667a061a02f109518D210bfd11D14c083998Ad03"},
    {"alias": "ant", "address": "0x45F8c4F7714C17F53Dd2B1d4A7F6b4b1461a866A"},
    {"alias": "vlh dumper", "address": "0xd96622a9099d758f8d6664ae702a59e9d548ed23"},
    {"alias": "heimdall", "address": "0x8470f7749e599067dc49a7cfc3cd51240c22b5c6"},
]

fs.readFile('./scripts/templateUsers.json', 'utf8', (err, jsonString) => {
    if (err){
        console.log(err);
        return;
    } else {
        const userList = JSON.parse(jsonString);
        for (let i = 0; i < 10; i++) {
            const userId = userList[Math.floor(Math.random() * userList.users.length)];
            const alias = wallets[Math.floor(Math.random() * wallets.length)].alias;
            const address = wallets[Math.floor(Math.random() * wallets.length)].address;
            const wallet = { alias, address, userId };
            db.wallets.insertOne(wallet);
        }
    }
});