// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, MessageCircle } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, MessageCircle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle } from "lucide-react";


export default function SupportPage() {
  return (
    <div className="container py-6">
      <div className="mx-auto max-w-2xl">
        <Card className="border-border/40 bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Поддержка</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Email:</div>
                <a
                  href="mailto:Support@trustee.up"
                  className="text-primary hover:text-primary/90 transition-colors"
                >
                  Support@trustee.up
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Telegram:</div>
                <a
                  href="https://t.me/trusteeUp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/90 transition-colors"
                >
                  @trusteeUp
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

