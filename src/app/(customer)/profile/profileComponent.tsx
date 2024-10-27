"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarCust, AvatarFallbackCust, AvatarImageCust } from "@/components/ui/avatar-customized"
import { Edit, MapPin, Upload, X, CircleUserRoundIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { redirect } from 'next/navigation'
import { useProfile } from "@/contexts/ProfileContext"

function CustomerProfileComponent() {
  const { profile, updateProfile, isLoading } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
  const [newAvatar, setNewAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [deleteCurrentAvatar, setDeleteCurrentAvatar] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile)
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
      setDeleteCurrentAvatar(false)
    }
  }

  const handleDeleteNewAvatar = () => {
    setNewAvatar(null)
    setAvatarPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDeleteCurrentAvatar = () => {
    setDeleteCurrentAvatar(true)
    setNewAvatar(null)
    setAvatarPreview(null)
    if (editedProfile) {
      setEditedProfile({ ...editedProfile, avatar: '' })
    }
  }

  const handleCloseDialog = () => {
    setIsEditing(false)
    setEditedProfile(profile)
    setNewAvatar(null)
    setAvatarPreview(null)
    setDeleteCurrentAvatar(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editedProfile) return

    setIsUpdating(true)

    try {
      const formData = new FormData()
      Object.entries(editedProfile).forEach(([key, value]) => {
        if (value !== undefined && key !== 'avatar') {
          formData.append(key, value.toString())
        }
      })
      if (newAvatar) {
        formData.append('avatar', newAvatar)
      }
      if (deleteCurrentAvatar && !newAvatar) {
        formData.append('deleteAvatar', 'true')
      }
      // Add the current avatar URL to the form data
      if (profile?.avatar) {
        formData.append('currentAvatarUrl', profile.avatar)
      }

      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formData,
      })

      if (response.status === 401) {
        redirect('/api/auth/login')
      }

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedProfile = await response.json()
      updateProfile(updatedProfile)
      setIsEditing(false)
      setNewAvatar(null)
      setAvatarPreview(null)
      setDeleteCurrentAvatar(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!profile || !editedProfile) {
    return <div>No profile data available.</div>
  }

  const avatarSrc = profile.avatar || '/img/placeholder.svg'

  return (
    <div className="container mx-auto px-12 py-4 max-w-2xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="rounded-full overflow-hidden w-24 h-24 items-center" >
              <AvatarCust>
                <AvatarImageCust src={avatarSrc} alt={profile.first_name ? `${profile.first_name} ${profile.last_name}` : 'User Avatar'} />
                <AvatarFallbackCust className="text-4xl">{profile.first_name ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}` : <CircleUserRoundIcon className="size-full" />}</AvatarFallbackCust>
              </AvatarCust>
            </div>
            <h1 className="text-2xl font-bold mb-1">{profile.first_name} {profile.last_name}</h1>
            <p className="text-muted-foreground mb-1">{profile.ig_name}</p>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.location}
            </p>
            <Dialog open={isEditing} onOpenChange={(open) => {
              if (!open) handleCloseDialog()
              else setIsEditing(true)
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="flex flex-row space-x-2 w-full" >
                    <div className="w-full">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={editedProfile.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={editedProfile.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2 w-full" >
                    <div className="w-full">
                      <Label htmlFor="ig_name">Instagram Nickname</Label>
                      <Input
                        id="ig_name"
                        name="ig_name"
                        value={editedProfile.ig_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={editedProfile.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <div className="flex items-center">
                      <Input
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Avatar
                      </Button>
                    </div>
                    <div className="mt-2 relative group w-[100px] h-[100px]">
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Avatar preview"
                          width={100}
                          height={100}
                          className="rounded-full object-cover w-[100px] h-[100px]"
                        />
                      ) : (
                        <Image
                          src={editedProfile.avatar || '/img/placeholder.svg'}
                          alt="Current avatar"
                          width={100}
                          height={100}
                          className="rounded-full object-cover w-[100px] h-[100px]"
                        />
                      )}
                      {(avatarPreview || (editedProfile.avatar && editedProfile.avatar !== '/img/placeholder.svg')) && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={avatarPreview ? handleDeleteNewAvatar : handleDeleteCurrentAvatar}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="pt-4" >
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? 'Updating...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>

              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">{profile.credits_sum}</p>
              <p className="ml-2 text-sm font-medium">Credits</p>
            </div>
            <Button>Buy Credits</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerProfileComponent