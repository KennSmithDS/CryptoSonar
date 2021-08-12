// default token address for USDT conversion

const baseToken = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"
const quoteToken = "0xe9e7cea3dedca5984780bafc599bd69add087d56"

const getUsdValue = `
{
  ethereum(network: bsc) {
    dexTrades(
      baseCurrency: {is: "${baseToken}"}
      quoteCurrency: {is: "${quoteToken}"}
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

const testWallet = "0xb7c45a37977ec7ee3772ffb131d7f2e07c838f12";

const getWalletTokens = `
    query {
        ethereum(network: bsc) {
        address(address: {is: "${testWallet}"}) {
            balances {
            currency {
                address
                symbol
                tokenType
            }
            value
            }
        }
        }
    }
`;

module.exports = { getUsdValue, getWalletTokens };