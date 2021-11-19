export interface ApiCollection {
  data: any
}

export const ENDPOINT = 'https://api.coingecko.com/api/v3';    

export const sendCoinGeckoRequest = async (): Promise<ApiCollection> => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets`, {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      vs_currency: 'usd',
      ids: 'l-pesa',
      order: 'market_cap_desc',
      per_page: 10,
      sparkline: false,
      price_change_percentage: '24h'
    }),
  })

  if (res.ok) {
    const json = await res.json()
    return json.data
  }
  console.error('Failed to fetch collections', res.statusText)
  return null
}
