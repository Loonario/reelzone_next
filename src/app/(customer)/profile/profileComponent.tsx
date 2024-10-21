"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarCust, AvatarFallbackCust, AvatarImageCust } from "@/components/ui/avatar-customized"
import { Edit, MapPin, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export interface CustomerProfileProps {
  firstName: string
  lastName: string
  ig_name: string
  location: string
  avatar: string
  credits: number
}

function CustomerProfileComponent({
  firstName,
  lastName,
  ig_name,
  location,
  avatar,
  credits
}: CustomerProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    firstName,
    lastName,
    ig_name,
    location
  })
  const [newAvatar, setNewAvatar] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(editedProfile).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (newAvatar) {
        formData.append('avatar', newAvatar)
      }

      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedProfile = await response.json()
      // Update the local state with the new profile data
      setEditedProfile(updatedProfile)
      if (updatedProfile.avatar) {
        avatar = updatedProfile.avatar
      }

      setIsEditing(false)
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
    }
  }

  return (
    <div className="container mx-auto px-12 py-4 max-w-2xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="rounded-full overflow-hidden w-24 h-24 items-center" >
              <AvatarCust>
                <AvatarImageCust src={avatar} alt={`${firstName} ${lastName}`} />
                <AvatarFallbackCust>{firstName}{lastName}</AvatarFallbackCust>
              </AvatarCust>
            </div>
            <h1 className="text-2xl font-bold mb-1">{editedProfile.firstName} {editedProfile.lastName}</h1>
            <p className="text-muted-foreground mb-1">{editedProfile.ig_name}</p>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {editedProfile.location}
            </p>
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={editedProfile.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={editedProfile.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ig_name">Instagram Nickname</Label>
                    <Input
                      id="ig_name"
                      name="ig_name"
                      value={editedProfile.ig_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={editedProfile.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center flex-row space-x-4">
                    <Label htmlFor="avatar">Profile Picture</Label>
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
                    {newAvatar && <p className="mt-2 text-sm">{newAvatar.name}</p>}
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">{credits}</p>
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