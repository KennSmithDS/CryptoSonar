require('dotenv').config();
const fetch = require('node-fetch');
const { usdValueQuery } = require('./queries/bitQuery');

const bscApiKey = process.env.BSC_API_KEY;
console.log(bscApiKey);

async function makeBscScanCall(url = '', walletAddress = '', startBlock = '', endBlock = '', sortOrder = '', apiKey = '') {
    try {
        const fullBscUrl = `${url}&address=${walletAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${apiKey}`;
        console.log(`Bscscan.com URL: ${fullBscUrl}`);
    
        const payload = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        };
        console.log(payload);
    
        const response = await fetch(fullBscUrl, payload);
        return response.json();   
    } catch (err) {
        console.log(err);
    }
};

// const url = 'https://api.bscscan.com/api?module=account&action=tokentx'
// const walletAddress = '0xb7c45a37977ec7ee3772ffb131d7f2e07c838f12'
// const startBlock = 0;
// const endBlock = 500000000;
// const sortOrder = 'desc';

// makeBscScanCall(url, walletAddress, startBlock, endBlock, sortOrder, bscApiKey)
//     .then(data => {
//         const transData = data.result;
//         transData.forEach(trans => {
//             const { timeStamp, contractAddress, tokenName, tokenSymbol, value } = trans;
//             console.log(`Transaction details: timestamp => ${timeStamp} contractAddress => ${contractAddress} tokenName => ${tokenName} tokenSymbol => ${tokenSymbol} value=>${value}`);
//         })
//     });

module.exports = { makeBscScanCall };