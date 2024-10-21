import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const action = String(formData.get('action'))
  const supabase = createRouteHandlerClient({ cookies })

  switch (action) {
    case 'signin':
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        if (error.message === 'Invalid login credentials') {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })
        }
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('profile')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (userError) {
          return NextResponse.json({ error: 'Error fetching user role' }, { status: 400 })
        }
        return NextResponse.json({ user: userData }, { status: 200 })
      }
      break

      case 'signup':
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${requestUrl.origin}/auth/confirm`,
          },
        })
        if (signUpError) return NextResponse.json({ error: signUpError.message }, { status: 400 })
        return NextResponse.json({ message: 'Check your email for the confirmation link.' })

    case 'google':
      const { data: googleData, error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${requestUrl.origin}/auth/callback`,
        },
      })
      if (googleError) return NextResponse.json({ error: googleError.message }, { status: 400 })
      return NextResponse.json({ url: googleData.url })

    case 'facebook':
      const { data: facebookData, error: facebookError } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${requestUrl.origin}/auth/callback`,
        },
      })
      if (facebookError) return NextResponse.json({ error: facebookError.message }, { status: 400 })
      return NextResponse.json({ url: facebookData.url })

    // case 'resetPassword':
    //   const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
    //     redirectTo: `${requestUrl.origin}/auth/callback?next=/update-password`,
    //   })
    //   if (resetError) return NextResponse.json({ error: resetError.message }, { status: 400 })
    //   return NextResponse.json({ message: 'Password reset email sent' })

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin)
}