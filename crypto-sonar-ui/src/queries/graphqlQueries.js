import { gql } from '@apollo/client';

const getUsers = gql`
    query {
        users {
            id
            userName
            userPassword
        }
    }
`;

const getWallets = gql`
    query {
        wallets {
            id
            alias
            address
        }
    }
`;

const getUserWallets = gql`
    query GetUserWallets($id: ID) {
        user(id: $id) {
        id
        wallets {
            alias
            address
            }
        }
    }
`;

const addWallet = gql`
    mutation ($alias: String!, $address: String!, $userId: ID!) {
        addWallet(alias: $alias, address: $address, userId: $userId) {
            id
            alias
            address
            userId
      }
    }
`;

const removeWallet = gql`
    mutation ($id: ID!) {
        removeWallet(id: $id) {
            id
            alias
        }
    }
`;

const addUser = gql`
    mutation ($userName: String!, $userPassword: String!) {
        addUser(userName: $userName, userPassword: $userPassword) {
            id
            userName
            userPassword
        }
    }
`;

const removeUser = gql`
    mutation ($id: ID!) {
        removeUser(id: $id) {
            id
            userName
        }
    }
`;

export { getUsers, getWallets, getUserWallets, addWallet, removeWallet, addUser, removeUser };