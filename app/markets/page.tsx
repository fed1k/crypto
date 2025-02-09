import { Suspense } from "react"
import { getBinancePrices } from "@/lib/binance"
import { MarketsList } from "./markets-list"
import { Skeleton } from "@/components/ui/skeleton"

const SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOTUSDT",
  "DOGEUSDT",
  "LINKUSDT",
  "ADAUSDT",
  "MATICUSDT",
  "AVAXUSDT",
]

export const revalidate = 60 // Обновление каждую минуту

export default async function MarketsPage() {
  const initialData = await getBinancePrices(SYMBOLS)
  console.log(initialData)

  return (
    <div className="container py-6">
      <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
        <MarketsList initialData={initialData} />
      </Suspense>
    </div>
  )
}

