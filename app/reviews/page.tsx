"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send } from "lucide-react"

export default function ReviewsPage() {
  const { toast } = useToast()
  const [review, setReview] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Спасибо за ваш отзыв!",
        })
        setReview("")
      } else {
        throw new Error("Ошибка отправки")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить отзыв",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="mx-auto max-w-2xl">
        <Card className="border-border/40 bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Оставить отзыв</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Напишите ваш отзыв..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[150px]"
                required
              />
              <Button type="submit" disabled={isLoading || !review.trim()} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить отзыв
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

