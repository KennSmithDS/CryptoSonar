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

const GET_USER_WALLETS = gql`
  query GetUserWallets($id: ID) {
    user(id: $id) {
    id
    wallets {
      id
      alias
      address
      }
    }
  }
`;

const ADD_WALLET = gql`
  mutation ($alias: String!, $address: String!, $userId: ID!) {
    addWallet(alias: $alias, address: $address, userId: $userId) {
      id
      alias
      address
      userId
    }
  }
`;

const REMOVE_WALLET = gql`
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

export { getUsers, getWallets, GET_USER_WALLETS, ADD_WALLET, REMOVE_WALLET, addUser, removeUser };