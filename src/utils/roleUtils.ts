import { UserRole } from '@/types'

export const getRoleBasedPath = (role: UserRole): string => {
  switch (role) {
    case 'customer':
      return '/dashboard'
    case 'reels_maker':
      return '/reels-maker/dashboard'
    case 'admin':
      return '/admin/dashboard'
    default:
      return '/login'
  }
}

export const getRoleBasedLoginPath = (role: UserRole): string => {
  switch (role) {
    case 'customer':
      return '/login'
    case 'reels_maker':
      return '/reels-maker-login'
    case 'admin':
      return '/admin-login'
    default:
      return '/login'
  }
}