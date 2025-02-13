import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, Globe, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useCoinData from "@/hooks/useBtcUsdt"
import PageTable from "./components/PageTable";

const news = [
  {
    date: "2024-02-05",
    title: "TrusteeUp запускает новую торговую пару BTC/USDT",
    description: "Теперь доступна торговля биткоином с нулевой комиссией...",
  },
  {
    date: "2024-02-04",
    title: "Обновление системы безопасности",
    description: "Мы усилили защиту ваших активов с помощью новой системы...",
  },
  {
    date: "2024-02-03",
    title: "Новые инструменты для трейдинга",
    description: "Добавлены продвинутые индикаторы и инструменты анализа...",
  },
]

async function fetchInitialData() {
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "BERAUSDT"];
  const url = 'https://api.binance.com/api/v3/ticker/24hr' + `?symbols=${JSON.stringify(symbols)}`;

  // Fetch initial prices for the coins
  console.log(url)
  const response = await fetch(`${url}`);
  const data = await response.json();

  // Format the data to return to the component
  
  if (Array.isArray(data)) {
    const initialCoinData = data.reduce((acc, coin) => {
      acc[coin.symbol.toLowerCase()] = {
        name: coin.symbol,
        price: coin.lastPrice,
        priceChangePercent: coin.priceChangePercent,
      };
      return acc;
    }, {});
    return initialCoinData;
  } else {
    console.error("Expected array, got", data);
    return {};
  }
}

const HomePage = async () => {

  const initialCoinData = await fetchInitialData();


  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Торгуйте криптовалютой <br />
                  <span className="gradient-text">безопасно и эффективно</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Ведущая платформа для торговли криптовалютой. Безопасность, скорость и профессиональные инструменты.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Начать торговлю
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Демо-счет
                </Button>
              </div>
              <div className="flex gap-8 border-t pt-8">
                <div>
                  <div className="text-3xl font-bold">$12B+</div>
                  <div className="text-muted-foreground">Дневной объем</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">5M+</div>
                  <div className="text-muted-foreground">Пользователей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-muted-foreground">Стран</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Trading Platform Preview"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="container">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Рынок</h2>
            <Button variant="ghost" className="text-primary">
              <Link className="text-primary flex items-center" href="/markets">
                Все рынки <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-card/40 backdrop-blur">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Пара</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>24ч Изменение</TableHead>
                  <TableHead className="text-right">Действие</TableHead>
                </TableRow>
              </TableHeader>

              <PageTable initialCoinData={initialCoinData} />
            </Table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-border/40 bg-card/40 backdrop-blur">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary" />
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Многоуровневая система защиты ваших активов и персональных данных</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/40 bg-card/40 backdrop-blur">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary" />
              <CardTitle>Скорость</CardTitle>
              <CardDescription>Мгновенное исполнение ордеров и высокая ликвидность</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/40 bg-card/40 backdrop-blur">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary" />
              <CardTitle>Доступность</CardTitle>
              <CardDescription>Торгуйте в любое время из любой точки мира</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Trading Section */}
      <section className="container">
        <Card className="border-border/40 bg-card/40 backdrop-blur">
          <CardHeader>
            <CardTitle>Начните торговлю</CardTitle>
            <CardDescription>Выберите тип торговли и начните зарабатывать уже сегодня</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="spot" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="spot">Спот</TabsTrigger>
                <TabsTrigger value="futures">Фьючерсы</TabsTrigger>
                <TabsTrigger value="p2p">P2P</TabsTrigger>
              </TabsList>
              <TabsContent value="spot" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Покупка BTC</h4>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Сумма USDT</label>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full rounded-md border bg-background px-3 py-2"
                            />
                          </div>
                          <Button className="w-full">Купить BTC</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Продажа BTC</h4>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Количество BTC</label>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full rounded-md border bg-background px-3 py-2"
                            />
                          </div>
                          <Button className="w-full" variant="outline">
                            Продать BTC
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="futures">
                <div className="py-6 text-center text-muted-foreground">
                  Фьючерсная торговля будет доступна в ближайшее время
                </div>
              </TabsContent>
              <TabsContent value="p2p">
                <div className="py-6 text-center text-muted-foreground">
                  P2P торговля будет доступна в ближайшее время
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* News Section */}
      <section className="container pb-20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Новости и обновления</h2>
            <Button variant="ghost" className="text-primary">
              Все новости <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((item) => (
              <Card key={item.title} className="border-border/40 bg-card/40 backdrop-blur">
                <CardHeader>
                  <div className="text-sm text-muted-foreground">{item.date}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

