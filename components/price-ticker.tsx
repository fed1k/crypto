"use client"

import { useEffect, useState } from "react"
import { formatNumber } from "@/lib/utils"

interface PriceData {
  symbol: string
  lastPrice: string
  priceChangePercent: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
}

interface PriceTickerProps {
  symbol: string
  initialData?: PriceData
}

export function PriceTicker({ symbol, initialData }: PriceTickerProps) {
  const [data, setData] = useState<PriceData | null>(initialData || null)
  const [isIncreasing, setIsIncreasing] = useState(false)

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws")

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol.toLowerCase()}@ticker`],
          id: 1,
        }),
      )
    }

    ws.onmessage = (event) => {
      const tickerData = JSON.parse(event.data)
      if (tickerData.e === "24hrTicker") {
        setData((prevData) => {
          if (prevData) {
            setIsIncreasing(Number(tickerData.c) > Number(prevData.lastPrice))
          }
          return {
            symbol: tickerData.s,
            lastPrice: tickerData.c,
            priceChangePercent: tickerData.P,
            highPrice: tickerData.h,
            lowPrice: tickerData.l,
            volume: tickerData.v,
            quoteVolume: tickerData.q,
          }
        })
      }
    }

    return () => {
      ws.close()
    }
  }, [symbol])

  if (!data) return null

  const priceChange = Number(data.priceChangePercent)
  const formattedPrice = formatNumber(Number(data.lastPrice), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const formattedVolume = formatNumber(Number(data.quoteVolume), {
    notation: "compact",
    maximumFractionDigits: 2,
  })

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <div className={`text-2xl font-bold transition-colors ${isIncreasing ? "text-green-500" : "text-red-500"}`}>
          {formattedPrice}
        </div>
        <div className={priceChange >= 0 ? "text-green-500" : "text-red-500"}>
          {priceChange >= 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center border-l px-4">
          <span className="text-sm text-muted-foreground">24ч Объём</span>
          <span className="font-medium">{formattedVolume}</span>
        </div>
        <div className="flex flex-col items-center border-l px-4">
          <span className="text-sm text-muted-foreground">24ч Макс</span>
          <span className="font-medium">
            {formatNumber(Number(data.highPrice), {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex flex-col items-center border-l px-4">
          <span className="text-sm text-muted-foreground">24ч Мин</span>
          <span className="font-medium">
            {formatNumber(Number(data.lowPrice), {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

