require('dotenv').config({path: '.env'});
const express = require('express');
const { connectToDb } = require('./db');
const mongoose = require('mongoose');
// const { ApolloServer, gql } = require('apollo-server-express');
// const { resolvers } = require('./resolvers');
// const { typeDefs } = require('./typeDefs');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
   
// Major inspiration for Atlas MongoDB integration came from Bed Awad https://github.com/benawad/graphql-mongo-server/
const startServer = async () => {

    const app = express();
    const port = process.env.API_SERVER_PORT || 3000;

    // const server = new ApolloServer({
    //     typeDefs,
    //     resolvers
    // });

    // server.applyMiddleware({ app });

    connectToDb();

    app.use('/graphql', graphqlHTTP({
        schema, graphiql: true
    }));

    app.listen({port}, () => {
        console.log(`Server connected and listening on ${port}`);
    });
};

startServer();