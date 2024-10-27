import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRoleBasedLoginPath } from './src/utils/roleUtils'
import { UserRole } from './src/types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { user } } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname

  // Allow public routes and auth callback
  if (path === '/' || path.startsWith('/auth') || path === '/login' || path === '/reels-maker-login' || path === '/admin-login') {
    return res
  }

  // Check authentication
  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Check role-based access
  const { data: profile, error } = await supabase
    .from('profile')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  const role = profile.role as UserRole

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(getRoleBasedLoginPath(role), req.url))
  }

  if (path.startsWith('/reels-maker') && role !== 'reels_maker') {
    return NextResponse.redirect(new URL(getRoleBasedLoginPath(role), req.url))
  }

  if (path.startsWith('/dashboard') && role !== 'customer') {
    return NextResponse.redirect(new URL(getRoleBasedLoginPath(role), req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}