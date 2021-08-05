require('dotenv').config();
const axios = require('axios');

const walletAddress = '0xb7c45a37977ec7ee3772ffb131d7f2e07c838f12'
const startBlock = 0;
const endBlock = 500000000;
const sortOrder = 'desc';

const bscApiKey = process.env.BSC_API_KEY;
console.log(bscApiKey);

const bqApiKey = process.env.BQ_API_KEY;
console.log(bqApiKey);

const bqUrl = process.env.BQ_URL;
console.log(bqUrl);

const bscUrl = `https://api.bscscan.com/api?module=account&action=tokentx&address=${walletAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${bscApiKey}`;

axios.get(bscUrl)
    .then(response => {
        const transx_arr = response.data.result;
        transx_arr.forEach(element => {
            const { timeStamp, contractAddress, tokenName, tokenSymbol, value } = element;
            console.log(`Transaction details: timestamp => ${timeStamp} contractAddress => ${contractAddress} tokenName => ${tokenName} tokenSymbol => ${tokenSymbol} value=>${value}`);
        })
    })
    .catch(err => {
        console.log(err)
    });