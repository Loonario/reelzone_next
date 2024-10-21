"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from  "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import { getRoleBasedPath } from "@/utils/roleUtils"

export default function ReelsMakerAuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('/api/auth/user')
      if (res.ok) {
        const { user } = await res.json()
        if (user) {
          router.replace(getRoleBasedPath(user.role))
        }
      }
    }

    checkUser()
  }, [router])

  const validateInputs = () => {
    if (!email || !password) {
      setError("Please fill in all fields")
      return false
    }
    return true
  }

  const handleAuth = async (e: React.FormEvent, action: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    if (!validateInputs()) {
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('action', action)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
    } else {
      if (action === 'resetPassword') {
        setMessage(data.message)
      } else if (data.user) {
        if (data.user.role !== 'reels_maker') {
          setError("You don't have permission to access this area")
        } else {
          router.replace(getRoleBasedPath(data.user.role))
        }
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reels Maker Login</CardTitle>
          <CardDescription>Sign in to your reels maker account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleAuth(e, 'signin')}>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error && !email ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={error && !password ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {error && <p className="text-sm text-red-500 h-5">{error}</p>}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <Button variant="link" onClick={(e) => handleAuth(e, 'resetPassword')} disabled={isLoading}>
                Forgot password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {message && (
        <Alert className="mt-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}