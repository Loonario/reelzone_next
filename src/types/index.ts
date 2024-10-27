export type UserRole = 'customer' | 'reels_maker' | 'admin'

export interface Profile {
  id: string
  first_name: string
  last_name: string
  ig_name: string
  location: string
  avatar: string
  credits_sum: number
  credits_reserved_sum: number
  role: UserRole

}