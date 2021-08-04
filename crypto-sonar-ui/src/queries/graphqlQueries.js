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
    query{
        user(id: ${id}) {
        id
        wallets {
            alias
            address
        }
        }
    }
`;