'use client'

import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/spinner'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return null // The useAuth hook will redirect to login if not authenticated
  }

  return <>{children}</>
}