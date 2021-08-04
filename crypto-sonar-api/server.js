require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
   
// Major inspiration for Atlas MongoDB integration came from Bed Awad https://github.com/benawad/graphql-mongo-server/
const startServer = async () => {

    // Define port from environment variables
    const port = process.env.API_SERVER_PORT || 3000;

    // Instantiate express server
    const app = express();

    // Allow cross-origin requests
    app.use(cors());

    // Connect to MongoDB
    connectToDb();

    // Configure GraphQL API
    app.use('/graphql', graphqlHTTP({
        schema, graphiql: true
    }));

    // Listen on server port for requests
    app.listen({port}, () => {
        console.log(`Server connected and listening on ${port}`);
    });
};

startServer();