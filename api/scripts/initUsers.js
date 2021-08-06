/*
 * Run using the mongo shell
 * localhost:
 *   mongo rypto-sonar-db init.users.js
 * Atlas Template:
 *   mongo mongodb+srv://user:pwd@<cluster-name>.xxx.mongodb.net/<database-name> init.users.js
 * Atlas Production:
 *   mongo mongodb+srv://admin:mVPn7sUKmnzTHvzH@crypto-sonar-db.l253g.mongodb.net/crypto-sonar-db init.users.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

// empty users collection
db.users.remove({});

const userNames = ["user1", "user2",'user3'];
const userPasswords = ["pass1", "pass2", "pass3"];

for (let i = 0; i < userNames.length; i++) {
    const name = userNames[i];
    const password = userPasswords[i];
    print('New test user:', name, ' inserted into database')
    const user = {name, password};
    db.users.insertOne(user);
}