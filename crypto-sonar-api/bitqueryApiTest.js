require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.BQ_API_KEY;
console.log(apiKey);

const url = process.env.BQ_URL;
console.log(url);

const testQuery = `
{
    ethereum(network: bsc) {
      dexTrades(
        baseCurrency: {is: "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"}
        quoteCurrency: {is: "0x55d398326f99059ff775485246999027b3197955"}
        options: {desc: ["block.height", "transaction.index"], limit: 1}
      ) {
        block {
          height
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
        }
        transaction {
          index
        }
        baseCurrency {
          symbol
        }
        quoteCurrency {
          symbol
        }
        quotePrice
        exchange {
          name
        }
      }
    }
  }
`;

const method = 'POST';

const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey
}

const body = JSON.stringify( testQuery );

// await axios.post(url, body, headers).then(response => {

// })
// .catch(err => {
//     console.log(err)
// });

async function makeBitqueryCall() {
    const config = {
        method: method,
        url: url,
        headers: headers,
        data: body
    }

    let result = await axios(config)
    .catch(err => { console.log(err) });

    console.log(result.data);
}

makeBitqueryCall();