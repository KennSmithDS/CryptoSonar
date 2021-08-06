const fetch = require('node-fetch');

const API_ENDPOINT='http://localhost:3000/graphql'
const userNames = ['SpongeBob', 'JimmyGnome','ZoeFish', 'MargeInCharge', 'EarlybirdEarl'];
const userPasswords = ['bob', 'jimmy', 'zoe', 'marge', 'earl'];
const wallets = [
    {"alias": "coach", "address": "0x7910609cF9DC8584385708fD9308907DB9644A3A"},
    {"alias": "batman", "address": "0x667a061a02f109518D210bfd11D14c083998Ad03"},
    {"alias": "ant", "address": "0x45F8c4F7714C17F53Dd2B1d4A7F6b4b1461a866A"},
    {"alias": "vlh dumper", "address": "0xd96622a9099d758f8d6664ae702a59e9d548ed23"},
    {"alias": "heimdall", "address": "0x8470f7749e599067dc49a7cfc3cd51240c22b5c6"},
    {"alias": "frankie", "address": "0x6b67ca50ba35c5eb1b0718b8f61df56fd279fcc9"},
    {"alias": "maxwell", "address": "0x7497691614df750654f8e4d896e537bfc216685f"},
    {"alias": "crypto buster", "address": "0xdbc5aa694fbe33e28410aed4f6eb8a6e56073e86"},
    {"alias": "gate", "address": "0xb72f8e8b0abda43d2f360f207a9a89fc8534fb5c"},
    {"alias": "anon", "address": "0xe5a0Fd70f459DC79Dc17d3F0cd6c779CE6ab6D02"}
]

async function initializeDb() {
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

            const userMutationResponse = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMutation }),
            });

            const userMutationResult = await userMutationResponse.json();
            console.log(userMutationResult);
            console.log(`New test user: '${name}' inserted into database`);
        }

        const userQuery = `
            query{
                users {
                    id
                }
            }
        `; 
    
        const userQueryResponse = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userQuery }),
        });

        const userQueryResult = await userQueryResponse.json();
        console.log(userQueryResult);

        const userList = [];
        userQueryResult.data.users.map(user => userList.push(user.id));
        console.log(userList);

        for (let j = 0; j < userList.length; j++) {
            const lastPos = 0;
            for (let i = 0; i < 3; i++) {
                const userPos = [];
                const userId = userList[j];
                const newPos = Math.floor(Math.random() * wallets.length);
                while (userPos.includes(newPos)) {
                    newPos = Math.floor(Math.random() * wallets.length);
                }
                userPos.push(newPos);
                walletPos = newPos;
                const alias = wallets[walletPos].alias;
                const address = wallets[walletPos].address;
    
                const walletMutation = `
                    mutation {
                        addWallet(alias: "${alias}", address: "${address}", userId: "${userId}") {
                            id
                            alias
                            address
                            userId
                        }
                    }
                `;
    
                const walletMutationResponse = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: walletMutation }),
                });
        
                const walletMutationResult = await walletMutationResponse.json();
                console.log(walletMutationResult);
            }
        }

    } catch (err) {
        console.log(err);
    }
}

initializeDb();