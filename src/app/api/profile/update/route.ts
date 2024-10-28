export const dynamic = "force-dynamic";

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import sharp from 'sharp'
import path from 'path'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const ig_name = formData.get('ig_name') as string
  const location = formData.get('location') as string
  const avatarFile = formData.get('avatar') as File | null
  const deleteAvatar = formData.get('deleteAvatar') === 'true'
  const currentAvatarUrl = formData.get('currentAvatarUrl') as string

  let avatarUrl = null

  // Extract the current avatar file name from the URL
  const currentAvatarFileName = currentAvatarUrl ? path.basename(new URL(currentAvatarUrl).pathname) : null

  // Delete the previous avatar if it exists
  if (currentAvatarFileName) {
    await supabase.storage
      .from('reelzone-bucket-media')
      .remove([`${user.id}/media/${currentAvatarFileName}`])
  }

  if (deleteAvatar) {
    avatarUrl = ''
  } else if (avatarFile) {
    const buffer = Buffer.from(await avatarFile.arrayBuffer())
    const optimizedImageBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .resize(200, 200, { fit: 'cover' })
      .toBuffer()

    const originalFileName = avatarFile.name
    const fileNameWithoutExt = path.parse(originalFileName).name
    const newFileName = `${fileNameWithoutExt}.webp`

    const { data, error } = await supabase.storage
      .from('reelzone-bucket-media')
      .upload(`${user.id}/media/${newFileName}`, optimizedImageBuffer, {
        contentType: 'image/webp',
        upsert: true,
      })

    if (error) {
      console.error('Error uploading avatar:', error)
      return NextResponse.json({ error: 'Failed to upload avatar' }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('reelzone-bucket-media')
      .getPublicUrl(`${user.id}/media/${newFileName}`)

    avatarUrl = publicUrl
  }

  const updateData: Record<string, string> = {
    first_name,
    last_name,
    ig_name,
    location,
  }

  if (avatarUrl !== null) {
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