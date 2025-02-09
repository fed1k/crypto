import Link from "next/link"

const footerLinks = {
  "О нас": [
    { name: "О компании", href: "/about" },
    { name: "Карьера", href: "/careers" },
    { name: "Контакты", href: "/contact" },
  ],
  Продукты: [
    { name: "Спот", href: "/spot" },
    { name: "Фьючерсы", href: "/futures" },
    { name: "P2P", href: "/p2p" },
    { name: "Институциональные", href: "/institutional" },
  ],
  Поддержка: [
    { name: "Центр поддержки", href: "/support" },
    { name: "Правила", href: "/rules" },
    { name: "Комиссии", href: "/fees" },
    { name: "Статус API", href: "/api-status" },
  ],
  Ресурсы: [
    { name: "Блог", href: "/blog" },
    { name: "Обучение", href: "/learn" },
    { name: "Реферальная программа", href: "/referral" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-sm font-medium">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold gradient-text">TrusteeUp</span>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="flex gap-4">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Конфиденциальность
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Условия использования
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">© 2024 TrusteeUp. Все права защищены.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

