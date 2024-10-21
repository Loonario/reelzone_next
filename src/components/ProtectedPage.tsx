import { AuthWrapper } from './AuthWrapper'

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  )
}