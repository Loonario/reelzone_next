'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from 'react'
import ResetPasswordComponent from './resetPasswordComponent'

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <Suspense fallback={<CardContent>Loading...</CardContent>}>
          <ResetPasswordComponent />
        </Suspense>
      </Card>
    </div>
  )
}