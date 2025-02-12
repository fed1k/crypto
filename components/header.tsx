"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import Image from "next/image"

const navigation = [
  { name: "Рынки", href: "/markets" }, // Добавлена новая ссылка
  { name: "Торговля", href: "/trading" },
  { name: "Инструменты", href: "/tools" },
  { name: "Стейкинг", href: "/staking" },
  { name: "P2P", href: "/p2p" },
  { name: "Поддержка", href: "/support" },
  { name: "Отзывы", href: "/reviews" },
  { name: "FAQ", href: "/faq" },
]

const userNavigation = [
  { name: "Обзор", href: "/dashboard" },
  { name: "Депозит", href: "/deposit" },
  { name: "Вывод", href: "/withdraw" },
  { name: "История", href: "/history" },
  { name: "Реферальная программа", href: "/referral" },
  { name: "Верификация", href: "/verification" },
  { name: "Настройки", href: "/settings" },
  { name: "Сменить аккаунт", href: "/switch-account" },
]

export function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({ email: "", uid: "" })

  useEffect(() => {
    const tempUser = sessionStorage.getItem("user")
    if (tempUser) {

      setUser(JSON.parse(tempUser))
    }
  }, [pathname])

  if (isAuthPage) return null
  return (
    <header className="border-b border-border/40 backdrop-blur-xl bg-background/95 fixed w-full top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex items-center lg:flex-1">
          {/* <Image src="/logo.png" alt="Logo" width={60} height={40} /> */}
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold gradient-text">TrusteeUp</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 justify-end gap-2">

          {!user.email ?
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Вход</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Регистрация</Link>

              </Button></> :
            <>
              <Button><Link href="/deposit">Deposit</Link></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle className="w-full h-full " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <p>{user.email}</p>
                  </DropdownMenuItem>
                  {userNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu></>}

        </div>
      </nav>
    </header>
  )
}

