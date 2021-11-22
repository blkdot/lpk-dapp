export const BASE_ENDPOINT = 'https://api.coingecko.com/api/v3';    
export const MARCKET_ENDPOINT = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=l-pesa&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h';    

export const sendMarketsDataRequest = async () => {
  const response = await fetch(MARCKET_ENDPOINT, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  if (response.ok) {
    const json = await response.json()
    return json
  }
  console.error('Failed to fetch collections', response.statusText)
  return null
}
