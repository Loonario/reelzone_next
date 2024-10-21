import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { token_hash } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  if (!token_hash) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const { error } = await supabase.auth.verifyOtp({
    token_hash: token_hash,
    type: 'email',
  })

  if (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

   // Insert new user profile in the public users table
    // Get user
    console.log("getting user");
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log(user);

    if (user) {
    const { error: updateError } = await supabase
      .from('profile')
      .update({ 
        email_confirmed: true,
      })
      .eq('id', user.id)
  console.log("user update passed");
    if (updateError) throw updateError;
    }

  return NextResponse.json({ message: 'Email confirmed successfully' }, { status: 200 })
}