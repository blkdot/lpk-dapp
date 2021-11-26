export interface ApiCollection {
  ethereum: any;
  data: any
}

export const ENDPOINT = 'https://graphql.bitquery.io';    

export const sendRequest = (url, token): Promise<ApiCollection> => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        query: token,
      }),
    })
      .then(response => response.json())
      .then(json => {
        resolve(json.data)
      })
      .catch(() => {
        reject()
      })
  })
}

export const makeQueryTokenPairs = (token, network='bsc') => {
  const query = `
    {
      ethereum(network: ${network}) {
          dexTrades(
            baseCurrency: {is: "${token}"}
            options: {desc: "trades", limit: 10}
          ) {
            poolToken: smartContract {
                address {
                  address
                }
            }
            exchange {
                fullName
            }
            pair: quoteCurrency {
                symbol
                address
            }
            trades: count
            quotePrice
        }
      }
    }
    `
    return query
}

export const makeQueryTokenPools = (address, baseToken, pairedToken, network='bsc') => {
  const query = `
    {
      ethereum(network: ${network}) {
        address(address: {is: "${address}"}) {
          balances(currency: {in: ["${baseToken}", "${pairedToken}"]}) {
            currency {
              address
              name
              symbol
            }
            value
          }
        }
      }
    }
    `
    return query
}

export const makeQueryLatestPrice = (address0, address1, network = 'bsc') => {
  return `
  {
    ethereum(network: ${network}) {
      dexTrades(
        options: {desc: ["block.height", "tradeIndex"], limit: 1}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        baseCurrency: {is: "${address0}"}
        quoteCurrency: {is: "${address1}"}
      ) {
        transaction {
          hash
        }
        tradeIndex
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        block {
          height
        }
        baseCurrency {
          symbol
          address
        }
        quoteCurrency {
          symbol
          address
        }
        quotePrice
      }
    }
  }  
  `
}
