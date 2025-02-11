import { Suspense } from "react"
import { getBinancePrice } from "@/lib/binance"
import CandlestickChart from "@/app/components/Candlesticks"
import { Skeleton } from "@/components/ui/skeleton"
import TradingView from "./trading-view"

interface TradingPageProps {
  searchParams: { pair?: string }
}

export const revalidate = 60 // Обновление каждую минуту

//build a trading view component 



export default async function TradingPage({ searchParams }: TradingPageProps) {
  const symbol = searchParams.pair || "BTCUSDT"
  const initialData = await getBinancePrice(symbol)

  return (
    <div className="container-fluid max-w-[1920px] px-4">
      <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
        {/* <CandlestickChart data={initialData} /> */}
        <TradingView />
      </Suspense>
    </div>
  )
}

