"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Facebook, Mail, Eye, EyeOff } from "lucide-react"
import { getRoleBasedPath } from "@/utils/roleUtils"

export default function CustomerAuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const res = await fetch('/api/auth/user')
  //     if (res.ok) {
  //       const { user } = await res.json()
  //       if (user) {
  //         router.replace(getRoleBasedPath(user.role))
  //       }
  //     }
  //   }

  //   checkUser()
  // }, [router])

  const validateInputs = (action: string) => {
    if (action === 'signin') {
      if (!email || !password) {
        setError("Please fill in all fields")
        return false
      }
    } else if (action === 'signup') {
      if (!email || !password || !confirmPassword) {
        setError("Please fill in all fields")
        return false
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return false
      }
    }
    return true
  }

  const handleAuth = async (e: React.FormEvent, action: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    if (!validateInputs(action)) {
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
      if (action === 'signup' || action === 'resetPassword') {
        setMessage(data.message)
      } else if (data.url) {
        window.location.href = data.url
      } else if (data.user) {
        if (data.user.role !== 'customer') {
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
          <CardTitle>Welcome to ReelZone</CardTitle>
          <CardDescription>Sign in or create a customer account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={(e) => handleAuth(e, 'signin')}>
                <div className="grid gap-2">
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
                  </div>
                  </form>
                  <div className="flex w-full justify-center items-center mt-2" >
                  <Link className=" flex w-auto"  href="/auth/reset-password">
                  {/* <Button variant="link" onClick={(e) => handleAuth(e, 'resetPassword')} disabled={isLoading}> */}
                  <Button variant="link">
                    Forgot password?
                  </Button>
                  </Link>
                  </div>
                
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={(e) => handleAuth(e, 'signup')}>
                <div className="grid gap-2">
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
                        placeholder="Create a password"
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
                  <div className="grid gap-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={error && !confirmPassword ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-500 h-5">{error}</p>}
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={(e) => handleAuth(e, 'google')} disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" onClick={(e) => handleAuth(e, 'facebook')} disabled={isLoading}>
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
          </div>
        </CardFooter>
      </Card>
      {message && (
        <div className="fixed flex bottom-0 justify-items-center items-center mb-4">
        <Alert className="place-self-center flex-col w-auto mt-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        </div>
      )}
    </div>
  )
}