require('dotenv').config();
// const fetch = require('node-fetch');
const { usdValueQuery } = require('./queries/bitqueryQueries');
// const { testQuery } = require('./queries/testBitqueryQuery');

const bqApiKey = process.env.BQ_API_KEY;
const url = process.env.BQ_API_ENDPOINT;

export async function makeBitQueryCall(url = url, key = bqApiKey, query = {}) {
    try {
        console.log(`Bitquery.io URL: ${url}`);
        console.log(`Bitquery.io API key: ${key}`);

        const payload = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": key
            },
            body: JSON.stringify({ query: query })
        };
        console.log(payload);

        const response = await fetch(url, payload);
        return response.json();
    } catch (err) {
        console.log(err);
    }
};

// makeBitQueryCall(url, apiKey, testQuery)
//     .then(data => {
//         console.log(data.data.ethereum.dexTrades);
//     });

// module.exports = { makeBitQueryCall };
export default makeBitQueryCall;