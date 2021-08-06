const fetch = require('node-fetch');

const API_ENDPOINT='http://localhost:3000/graphql'
const userNames = ["user1", "user2",'user3'];
const userPasswords = ["pass1", "pass2", "pass3"];
const wallets = [
    {"alias": "coach", "address": "0x7910609cF9DC8584385708fD9308907DB9644A3A"},
    {"alias": "batman", "address": "0x667a061a02f109518D210bfd11D14c083998Ad03"},
    {"alias": "ant", "address": "0x45F8c4F7714C17F53Dd2B1d4A7F6b4b1461a866A"},
    {"alias": "vlh dumper", "address": "0xd96622a9099d758f8d6664ae702a59e9d548ed23"},
    {"alias": "heimdall", "address": "0x8470f7749e599067dc49a7cfc3cd51240c22b5c6"},
]
async function insertUsers() {
    try {
        for (let i = 0; i < userNames.length; i++) {
            const name = userNames[i];
            const password = userPasswords[i];

            const userMutation = `
                mutation {
                    addUser(userName: "${name}", userPassword: "${password}") {
                        id
                        userName
                        userPassword
                    }
                }
            `;

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMutation }),
            });

            const userResult = await response.json();
            console.log(`New test user: '${name}' inserted into database`);
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function queryUsers() {
    if (insertUsers) {
        try {
            const userQuery = `
            query{
                users {
                id
                }
            }
            `; 
        
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userQuery }),
            });
    
            const result = await response.json();
            console.log(result);
            return result
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('User query did not execute successfully')
    }
}

queryUsers();

async function insertWallets() {
    const userList = await queryUsers();
    console.log(userList);
}