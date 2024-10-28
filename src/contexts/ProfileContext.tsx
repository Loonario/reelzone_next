"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Profile } from '@/types'

interface ProfileContextType {
  profile: Profile | null
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  updateProfile: (newData: Partial<Profile>) => Promise<void>
  isLoading: boolean
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
        } else {
          setProfile(data)
        }
      }
      setIsLoading(false)
    }

    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateProfile = async (newData: Partial<Profile>) => {
    if (!profile) return

    const { data, error } = await supabase
      .from('profile')
      .update(newData)
      .eq('id', profile.id)
      .select()

    if (error) {
      console.error('Error updating profile:', error)
    } else {
      setProfile({ ...profile, ...newData })
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  )
}