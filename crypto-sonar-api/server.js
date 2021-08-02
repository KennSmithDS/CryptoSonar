require('dotenv').config({path: '.env'});
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { connectToDb } = require('./db');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');
   
const startServer = async () => {

    const app = express();
    const port = process.env.API_SERVER_PORT || 3000;

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.applyMiddleware({ app });

    connectToDb();

    app.listen({port}, () => {
        console.log(`Server connected and listening on ${port}`);
    });
};

startServer();