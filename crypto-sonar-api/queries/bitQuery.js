// default token address for USDT conversion

const quoteToken = "0x55d398326f99059ff775485246999027b3197955"

const usdValueQuery = `
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

module.exports = { usdValueQuery };