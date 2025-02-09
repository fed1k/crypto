"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2 } from "lucide-react"

const coins = [
  { id: "BTC", name: "Bitcoin" },
  { id: "ETH", name: "Ethereum" },
  { id: "USDT", name: "Tether" },
]

export default function ToolsPage() {
  const { toast } = useToast()
  const [fromCoin, setFromCoin] = useState("BTC")
  const [toCoin, setToCoin] = useState("USDT")
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the rate from Binance API
    setRate(Math.random() * 50000)
  }, [])

  const handleConvert = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      toast({
        title: "Конвертация выполнена",
        description: `${amount} ${fromCoin} → ${(Number(amount) * rate).toFixed(2)} ${toCoin}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <Card className="border-border/40 bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Конвертация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Select value={fromCoin} onValueChange={setFromCoin}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {coins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        {coin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Select value={toCoin} onValueChange={setToCoin}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {coins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        {coin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input type="number" placeholder="Сумма" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="text-sm text-muted-foreground">
              Курс: 1 {fromCoin} = {rate.toFixed(2)} {toCoin}
            </div>
            <Button onClick={handleConvert} className="w-full" disabled={isLoading || !amount}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Конвертация...
                </>
              ) : (
                <>
                  Подтвердить
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Капитализация", "Скринер", "Технический анализ", "Кросс-ставки", "Тепловая карта"].map((tool) => (
            <Card
              key={tool}
              className="border-border/40 bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <CardHeader>
                <CardTitle className="text-base">{tool}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Пока недоступно</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

