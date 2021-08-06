/*
 * Run using the mongo shell
 * localhost:
 *   mongo rypto-sonar-db emptyDb.js
 * Atlas Template:
 *   mongo mongodb+srv://user:pwd@<cluster-name>.xxx.mongodb.net/<database-name> emptyDb.js
 * Atlas Production:
 *   mongo mongodb+srv://admin:mVPn7sUKmnzTHvzH@crypto-sonar-db.l253g.mongodb.net/crypto-sonar-db scripts/emptyDb.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

// empty users collection
db.users.remove({});
db.wallets.remove({});