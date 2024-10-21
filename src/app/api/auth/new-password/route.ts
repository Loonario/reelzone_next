import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password, code } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  if (!code) {
    console.log('token missed')
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  
  if (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const { error: errorUserUpdate } = await supabase.auth.updateUser({
    password: password,
  })

  if (errorUserUpdate) {
    console.log(errorUserUpdate)
    return NextResponse.json({ error: errorUserUpdate.message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 })
}