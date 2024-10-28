'use client'
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function ConfirmComponent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams?.get('token_hash') ?? null;
      //console.log("TOKEN_HASH: " + token_hash)
      if (!token_hash) {
        setStatus('error')
        return
      }

      try {
        const response = await fetch('/api/auth/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token_hash }),
        })

        if (response.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error('Confirmation error:', error)
        setStatus('error')
      }
    }

    confirmEmail()
  }, [searchParams])

  
  return (
    <CardContent>
      {status === 'loading' && <p>Confirming your email...</p>}
      {status === 'success' && (
        <>
          <p className="mb-4">Your email has been successfully confirmed!</p>
          <Button asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </>
      )}
      {status === 'error' && (
        <>
          <p className="mb-4">There was an error confirming your email. Please try again or contact support.</p>
          <Button asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </>
      )}
    </CardContent>
  )
}