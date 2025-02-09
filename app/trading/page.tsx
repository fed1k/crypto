import { Suspense } from "react"
import { getBinancePrice } from "@/lib/binance"
// import { TradingView } from "./trading-view"
import { Skeleton } from "@/components/ui/skeleton"

interface TradingPageProps {
  searchParams: { pair?: string }
}

export const revalidate = 60 // Обновление каждую минуту

export default async function TradingPage({ searchParams }: TradingPageProps) {
  const symbol = searchParams.pair || "BTCUSDT"
  const initialData = await getBinancePrice(symbol)

  return (
    <div className="container-fluid max-w-[1920px] px-4">
      <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
        {/* <TradingView symbol={symbol} initialData={initialData} /> */}
      </Suspense>
    </div>
  )
}

