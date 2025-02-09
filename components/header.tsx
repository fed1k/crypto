"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const navigation = [
  { name: "Рынки", href: "/markets" }, // Добавлена новая ссылка
  { name: "Торговля", href: "/trading" },
  { name: "Инструменты", href: "/tools" },
  { name: "Стейкинг", href: "/staking" },
  { name: "P2P", href: "/p2p" },
  { name: "Поддержка", href: "/support" },
  { name: "Отзывы", href: "/reviews" },
]

const userNavigation = [
  { name: "Обзор", href: "/dashboard" },
  { name: "Депозит", href: "/deposit" },
  { name: "Вывод", href: "/withdraw" },
  { name: "История", href: "/history" },
  { name: "Сменить аккаунт", href: "/switch-account" },
  { name: "Реферальная программа", href: "/referral" },
  { name: "Настройки", href: "/settings" },
  { name: "Верификация", href: "/verification" },
]

export function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")
  const [isOpen, setIsOpen] = useState(false)

  if (isAuthPage) return null

  return (
    <header className="border-b border-border/40 backdrop-blur-xl bg-background/95 fixed w-full top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
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
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-muted-foreground"
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
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
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
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Вход</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Регистрация</Link>
          </Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {userNavigation.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </nav>
    </header>
  )
}

