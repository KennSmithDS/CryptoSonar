const fetch = require('node-fetch');
const fs = require('fs');

const API_ENDPOINT='http://localhost:3000/graphql'

const USER_QUERY = `
  query{
    users {
      id
    }
  }
`;

async function getDbUsers() {
    try {
    
        const payload = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: USER_QUERY })
        };
        // console.log(payload);
    
        const response = await fetch(API_ENDPOINT, payload);
        return response.json();   
    } catch (err) {
        console.log(err);
    }
};

getDbUsers()
    .then(data => {
        const users = data.data.users;

        let userList = [];

        console.log('Users found in DB:')
        users.map(user => {
          console.log(user);
          userList.push(user.id);
        });
        
        let userSet = JSON.stringify({ users: userList });
        fs.writeFile('./scripts/templateUsers.json', userSet, function(err) {
          if (err) throw err;
          console.log(err);
        });
    });

