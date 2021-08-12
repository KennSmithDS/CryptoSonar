import { gql } from '@apollo/client';

const USER_LOGIN = gql`
  query UserLogin($userName:String!, $userPassword:String!) {
    userLogin(userName: $userName, userPassword: $userPassword) {
      id 
    }
  }
`;

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

const ADD_USER = gql`
    mutation ($userName: String!, $userPassword: String!) {
        addUser(userName: $userName, userPassword: $userPassword) {
            id
            userName
            userPassword
        }
    }
`;

const REMOVE_USER = gql`
    mutation ($id: ID!) {
        removeUser(id: $id) {
            id
            userName
        }
    }
`;

export { USER_LOGIN, getUsers, getWallets, GET_USER_WALLETS, ADD_WALLET, REMOVE_WALLET, ADD_USER, REMOVE_USER };