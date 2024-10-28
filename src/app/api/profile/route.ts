export const dynamic = "force-dynamic";

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('profile')
    .select('id, first_name, last_name, ig_name, location, avatar, credits_sum')
    .eq('id', session.user.id)
    .single()

  if (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const profile = {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    ig_name: data.ig_name,
    location: data.location,
    avatar: data.avatar,
    credits: data.credits_sum
  }

  return NextResponse.json(profile)
}