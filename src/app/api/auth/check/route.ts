export const dynamic = "force-dynamic";

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('profile')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, role: data.role }, { status: 200 })
}