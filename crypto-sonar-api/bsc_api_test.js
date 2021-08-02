require('dotenv').config()
const axios = require('axios');

const walletAddress = '0xb7c45a37977ec7ee3772ffb131d7f2e07c838f12'
const startBlock = 0;
const endBlock = 500000000;
const sortOrder = 'desc';
const apiKey = process.env.BSC_API_KEY;

const url = `https://api.bscscan.com/api?module=account&action=tokentx&address=${walletAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${apiKey}`;

axios.get(url).then(response => {
    const transx_arr = response.data.result;
    transx_arr.forEach(element => {
        const { timeStamp, contractAddress, tokenName, tokenSymbon, value } = element;
        console.log(`Transaction details: timestamp => ${timeStamp} contractAddress => ${contractAddress} tokenName => ${tokenName} tokenSymbol => ${tokenSymbon} value=>${value}`);
    })
})
.catch(err => {
    console.log(err)
});