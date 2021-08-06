const testQuery = `
{
  ethereum(network: bsc) {
    dexTrades(
      baseCurrency: {is: "0xb86abcb37c3a4b64f74f59301aff131a1becc787"}
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

module.exports = { testQuery };