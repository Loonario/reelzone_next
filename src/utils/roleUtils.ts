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
      return '/auth/login'
  }
}

export const getRoleBasedLoginPath = (role: UserRole): string => {
  switch (role) {
    case 'customer':
      return '/auth/login'
    case 'reels_maker':
      return '/auth/reels-maker-login'
    case 'admin':
      return '/auth/admin-login'
    default:
      return '/auth/login'
  }
}