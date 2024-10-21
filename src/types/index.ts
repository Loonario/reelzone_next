export type UserRole = 'customer' | 'reels_maker' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
}