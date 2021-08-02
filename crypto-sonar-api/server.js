require('dotenv').config({path: '.env'});
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
   
const startServer = async () => {

    const app = express();
    const port = process.env.API_SERVER_PORT || 3000;

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.applyMiddleware({ app });

    app.listen({port}, () => {
        console.log(`Server connected and listening on ${port}`);
    });
};

startServer();