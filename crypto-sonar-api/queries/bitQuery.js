// default token address for USDT conversion

const quoteToken = "0x55d398326f99059ff775485246999027b3197955"

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