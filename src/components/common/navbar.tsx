"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { AvatarCust, AvatarFallbackCust, AvatarImageCust } from "@/components/ui/avatar-customized"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, FileText, CreditCard, LogOut } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useProfile } from "@/contexts/ProfileContext"
import {Profile} from "@/types"

// interface UserProfile {
//   id: string
//   first_name: string
//   last_name: string
//   avatar: string
// }

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(false)
  //const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { profile } = useProfile()
  const [profileState, setProfileState] = useState<Profile | null>(null)

  useEffect(() => {
    if (profile) {
      setProfileState(profile)
    }
  }, [profile])

  // useEffect(() => {
  //   fetchUserProfile()
  // }, [])

  // const fetchUserProfile = async () => {
  //   try {
  //     const response = await fetch('/api/profile')
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user profile')
  //     }
  //     const data = await response.json()
  //     setUserProfile(data)
  //   } catch (error) {
  //     console.error('Error fetching user profile:', error)
  //     toast({
  //       title: "Error",
  //       description: "Failed to load user profile. Please try again.",
  //       variant: "destructive",
  //     })
  //   }
  // }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/auth/login") // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <nav className="border-b fixed top-0 left-0 w-full bg-background z-[500]">
      <div className="container mx-auto flex h-16 items-center px-12 max-w-[1440px]">
        <Link href="/referencesFeed" className="flex items-center">
          <span className="text-2xl font-bold">ReelZone</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-8 w-8 rounded-full overflow-hidden items-center border" >
              <Button variant="ghost" className="relative w-full p-0">
              <AvatarCust>
                  <AvatarImageCust src={profileState?.avatar} alt={profileState ? `${profileState.first_name} ${profileState.last_name}` : "User"} />
                  <AvatarFallbackCust className="bg-transparent">
                    {profileState ? `${profileState.first_name[0]}${profileState.last_name[0]}` : "U"}
                  </AvatarFallbackCust>
                </AvatarCust>
              </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[600]" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/profile" className={"flex w-full"}>
                <Button
              className={`${pathname === "/profile" ? "font-medium" : "font-normal"} justify-start p-0 h-5 w-full`}
                  variant="ghost"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex w-full justify-items-start">
                <Button
              className={`${pathname === "/tasksDashboard" ? "font-medium" : "font-normal"} justify-start p-0 h-5 w-full`}
                  variant="ghost"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Tasks</span>
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/billing" className="flex w-full">
                <Button
              className={`${pathname === "/billing" ? "font-medium" : "font-normal"} justify-start p-0 h-5 w-full`}
                  variant="ghost"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
              <Button
              className="font-normal p-0 h-5"
                  variant="ghost"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Logging out..."
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </>
                  )}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}