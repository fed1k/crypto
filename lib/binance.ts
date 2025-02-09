const BINANCE_API_URL = "https://api.binance.com/api/v3"

export const TRADING_PAIRS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "ADAUSDT",
  "SOLUSDT",
  "DOTUSDT",
  "DOGEUSDT",
  "AVAXUSDT",
  "SHIBUSDT",
  "MATICUSDT",
  "LTCUSDT",
  "LINKUSDT",
  "XLMUSDT",
  "UNIUSDT",
  "ATOMUSDT",
  "ALGOUSDT",
  "VETUSDT",
  "FILUSDT",
  "ICPUSDT",
  "HBARUSDT",
  "XTZUSDT",
  "EGLDUSDT",
  "AAVEUSDT",
  "XMRUSDT",
  "IOTAUSDT",
  "EOSUSDT",
  "KSMUSDT",
  "NEOUSDT",
  "FLOWUSDT",
  "SUSHIUSDT",
  "ZECUSDT",
  "DASHUSDT",
  "WAVESUSDT",
  "CHZUSDT",
  "ENJUSDT",
  "THETAUSDT",
  "MANAUSDT",
  "SANDUSDT",
  "HNTUSDT",
  "QTUMUSDT",
  "XEMUSDT",
  "BATUSDT",
  "STXUSDT",
  "ONEUSDT",
  "HOTUSDT",
  "ONTUSDT",
  "DGBUSDT",
]

export async function getBinancePrice(symbol: string) {
  try {
    const response = await fetch(`${BINANCE_API_URL}/ticker/24hr?symbol=${symbol}`)
    if (!response.ok) throw new Error("Network response was not ok")
    return await response.json()
  } catch (error) {
    console.error("Error fetching price:", error)
    return null
  }
}

export async function getBinancePrices(symbols: string[]) {
  try {
    const response = await fetch(`${BINANCE_API_URL}/ticker/24hr`)
    if (!response.ok) throw new Error("Network response was not ok")
    const data = await response.json()
    const test = data.filter((item: any) => symbols.includes(item.symbol))
    console.log(test)
    const initialCoinData = test.reduce((acc, coin) => {
      acc[coin.symbol.toLowerCase()] = {
        name: coin.symbol,
        price: coin.lastPrice,
        priceChangePercent: coin.priceChangePercent,
        lowPrice: coin.lowPrice,
        highPrice: coin.highPrice,
        quoteVolume: coin.quoteVolume
      };
      return acc;
    }, {});

    return initialCoinData
  } catch (error) {
    console.error("Error fetching prices:", error)
    return []
  }
}

