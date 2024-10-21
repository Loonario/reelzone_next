import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import sharp from 'sharp'
//import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const ig_name = formData.get('ig_name') as string
  const location = formData.get('location') as string
  const avatarFile = formData.get('avatar') as File | null

  let avatarUrl = null

  if (avatarFile) {
    const buffer = Buffer.from(await avatarFile.arrayBuffer())
    const optimizedImageBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .resize(200, 200, { fit: 'cover' })
      .toBuffer()

    const fileName = `avatar.webp`
    const { data, error } = await supabase.storage
      .from('reelzone-bucket-media')
      .update(`${user.id}/media/${fileName}`, optimizedImageBuffer, {
        contentType: 'image/webp',
        upsert: true,
      })

    if (error) {
      console.error('Error uploading avatar:', error)
      return NextResponse.json({ error: 'Failed to upload avatar' }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('reelzone-bucket-media')
      .getPublicUrl(`${user.id}/media/${fileName}`)

    avatarUrl = publicUrl
  }

  const updateData: any = {
    first_name: firstName,
    last_name: lastName,
    ig_name,
    location,
  }

  if (avatarUrl) {
    updateData.avatar = avatarUrl
  }

  const { data, error } = await supabase
    .from('profile')
    .update(updateData)
    .eq('id', user.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data[0])
}