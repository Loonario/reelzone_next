export const dynamic = "force-dynamic";

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const { data: user, error } = await supabase
    .from('user')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (error || !user) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, user: user }, { status: 200 })
}