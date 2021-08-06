# CryptoSONAR Back-end Deployment

The back-end deployment of the CryptoSONAR server uses Express to host a GraphQL centric server and end-point which the front-end can make POST requests to query users and wallets in the collections, as well as making mutations to the collections by adding or removing documents as needed for user interaction with the application.

### `npm start`

Runs Express and uses the GraphQL HTTP Server middleware to assign the database schema, as well as host the GraphQL API endpoint and GraphiQL web browser interface.

### Local Deployment: `mongo crypto-sonar-db scripts/emptyDb.js`
### Remote Deployment: `mongo mongodb+srv://admin:mVPn7sUKmnzTHvzH@crypto-sonar-db.l253g.mongodb.net/crypto-sonar-db scripts/emptyDb.js`

Drops all instances of user and wallet documents from the repsective collections to empty the database.

### `node scripts/initializeDb.js`

Constructs mock user and wallet documents to be inserted into the database for testing purposes using defined mutation types.

## NOTE: In order to make sure that the initializeDb.js script writes data to the correct database, you need to update the .env file so that the MongoDB connection is pointing to the right place.

### Local Deployment: `DB_URL=mongodb://localhost/crypto-sonar-db`
### Remote Deployment: `DB_URL=mongodb+srv://admin:mVPn7sUKmnzTHvzH@crypto-sonar-db.l253g.mongodb.net/crypto-sonar-db?retryWrites=true&w=majority`