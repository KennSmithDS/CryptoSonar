const { gql } = require('apollo-server-express');


export const typeDefs = gql`
    type Query {
        helloWorld: String!
        wallets: [Wallet!]!
    }

    type User {
        id: ID!
        userId: Int
        userName: String!
        userPassword: String!
        signedIn: Boolean!
    }

    type Wallet {
        alias: String!
        address: String!
    }

    type WalletList {
        wallets: [Wallet!]
    }

`;