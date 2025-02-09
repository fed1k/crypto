"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Search, ArrowUpDown } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { CryptoIcon } from "@/components/crypto-icon"

interface MarketData {
  symbol: string
  lastPrice: string
  priceChangePercent: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
}

interface MarketsListProps {
  initialData: MarketData[]
}

export function MarketsList({ initialData }: MarketsListProps) {
  const [coins, setCoins] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  } | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const handleSort = (key: string) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        return {
          key,
          direction: currentSort.direction === "asc" ? "desc" : "asc",
        }
      }
      return { key, direction: "asc" }
    })
  }

  // const formatPair = (symbol: string) => {
  //   console.log(symbol)
  //   const base = symbol.replace("USDT", "")
  //   return `${base}/USDT`
  // }

  useEffect(() => {
    // const sortedMarkets = [...initialData].sort((a, b) => {
    //   if (!sortConfig) return 0

    //   let aValue: string | number = a[sortConfig.key as keyof MarketData] || ""
    //   let bValue: string | number = b[sortConfig.key as keyof MarketData] || ""

    //   if (sortConfig.key === "lastPrice" || sortConfig.key === "priceChangePercent") {
    //     aValue = Number(aValue)
    //     bValue = Number(bValue)
    //   }

    //   if (typeof aValue === "number" && typeof bValue === "number") {
    //     return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
    //   }

    //   return sortConfig.direction === "asc"
    //     ? String(aValue).localeCompare(String(bValue))
    //     : String(bValue).localeCompare(String(aValue))
    // })

    // const filteredMarkets = sortedMarkets.filter((market) =>
    //   formatPair(market.symbol).toLowerCase().includes(searchTerm.toLowerCase()),
    // )
    // console.log(filteredMarkets)

    // Store WebSocket instances to ensure each connection is handled properly
    // console.log(initialData)
    const changed = Object.keys(coins)
    // console.log(changed)


    const sockets = changed.map((symbol) => {
      const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@ticker`;
      const socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { P, c, s, h, l, q } = data;
        console.log(data)

        // console.log(data)


        // Prevent state update if data hasn't changed
        setCoins((prevData) => {
          console.log(s)
          return {
            ...prevData,
            [s.toLowerCase()]: { name: s, price: c, priceChangePercent: P, highPrice: h, lowPrice: l, quoteVolume: q }
          };
        });
      };

      socket.onopen = () => {
        console.log(`WebSocket connected for ${symbol}`);
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
      };

      socket.onclose = () => {
        console.log(`WebSocket connection closed for ${symbol}`);
      };

      return socket;
    });

    // let updatedObj = Object.entries(coins)
    //   .filter(([key, value]) => isNaN(key)) // Filter out keys that are numbers
    //   .reduce((acc, [key, value]) => {
    //     acc[key] = value; // Rebuild the object with non-numeric keys
    //     return acc;
    //   }, {});
    // setCoins(updatedObj)


    // Cleanup function to close all WebSocket connections when the component is unmounted or when the symbols change
    return () => {
      sockets.forEach((socket) => socket.close());
    };

    // setCoins(filteredMarkets)
  }, [initialData])



  const toggleFavorite = (symbol: string) => {
    setFavorites((current) => (current.includes(symbol) ? current.filter((s) => s !== symbol) : [...current, symbol]))
  }

  console.log(coins)

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4">
        <Tabs defaultValue="spot" className="w-full">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="spot">Спот</TabsTrigger>
              <TabsTrigger value="futures">Фьючерсы</TabsTrigger>
              <TabsTrigger value="options">Опционы</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <TabsContent value="spot" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("symbol")}
                      className="font-bold hover:text-primary"
                    >
                      Пара
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("lastPrice")}
                      className="font-bold hover:text-primary"
                    >
                      Цена
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("priceChangePercent")}
                      className="font-bold hover:text-primary"
                    >
                      24ч Изменение
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("highPrice")}
                      className="font-bold hover:text-primary"
                    >
                      24ч Максимум
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("lowPrice")}
                      className="font-bold hover:text-primary"
                    >
                      24ч Минимум
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("quoteVolume")}
                      className="font-bold hover:text-primary"
                    >
                      24ч Объём
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(coins).map((co) => {

                  const market = coins[co]
                  return (
                    <TableRow key={market.name}>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(market.name)}>
                          <Star
                            className={`h-4 w-4 ${favorites.includes(market.name)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                              }`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* <CryptoIcon symbol={market.symbol} size={20} /> */}
                          <span className="font-medium">{market.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatNumber(Number(market.price), {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })}
                      </TableCell>
                      <TableCell className={Number(market.priceChangePercent) >= 0 ? "text-green-500" : "text-red-500"}>
                        {Number(market.priceChangePercent) >= 0 ? "+" : ""}
                        {Number(market.priceChangePercent).toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        {formatNumber(Number(market.highPrice), {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })}
                      </TableCell>
                      <TableCell>
                        {formatNumber(Number(market.lowPrice), {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })}
                      </TableCell>
                      <TableCell>
                        {formatNumber(Number(market.quoteVolume), {
                          notation: "compact",
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => (window.location.href = `/trading?pair=${market.symbol}`)}
                        >
                          Торговать
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="futures" className="mt-4">
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              Фьючерсы будут доступны в ближайшее время
            </div>
          </TabsContent>

          <TabsContent value="options" className="mt-4">
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              Опционы будут доступны в ближайшее время
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

