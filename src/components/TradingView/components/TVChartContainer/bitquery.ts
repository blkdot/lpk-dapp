export const endpoint = 'https://graphql.bitquery.io';    

export const GET_COIN_INFO =`
{
  ethereum(network: bsc) {
    dexTrades(
      options: {desc: ["block.height", "transaction.index"], limit: 1}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: "0x580de58c1bd593a43dadcf0a739d504621817c05"}
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
    ) 
    {
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
        name
        symbol
        decimals
      }
      quotePrice
    }
  }
}
`
export const GET_COIN_BARS = (from, to) => `
{
  ethereum(network: bsc) {
    dexTrades(
      options: {asc: "timeInterval.minute"}
      date: {since: "${from}", till: "${to}"}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: "0x580de58c1bd593a43dadcf0a739d504621817c05"},
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
      tradeAmountUsd: {gt: 10}
    ) 
    {
      timeInterval {
        minute(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")  
      }
      volume: quoteAmount
      high: quotePrice(calculate: maximum)
      low: quotePrice(calculate: minimum)
      open: minimum(of: block, get: quote_price)
      close: maximum(of: block, get: quote_price) 
    }
  }
}
`