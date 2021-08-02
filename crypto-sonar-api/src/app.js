const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlServer = require('express-graphql');
const { buildSchema,  } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlServer({
    schema: buildSchema(`
    type RootQuery {
        user: [String!]!
    }   
    
    type RootMutation {
        addWallet(wallet: String!): String
    }
    
    schema {
            query:
            mutation:
        }
    `),
    rootValue: {

    }
}))

app.listen(3000);