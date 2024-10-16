"use client"

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

export function Navbar() {
  return (
    <nav className="border-b fixed top-0 left-0 w-full bg-background z-[500]">
      <div className="container mx-auto flex h-16 items-center px-12 max-w-[1440px]">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">ReelZone</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-8 w-8 rounded-full overflow-hidden items-center border" >
              <Button variant="ghost" className="relative w-full p-0">
                <AvatarCust>
                  <AvatarImageCust src="/img/customer_ava.jpg" alt="Jonny Snow" />
                  <AvatarFallbackCust className="bg-transparent">JS</AvatarFallbackCust>
                </AvatarCust>
              </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[600]" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/customer/profile" className="flex w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/customer/tasksDashboard" className="flex w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Tasks</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/customer/billing" className="flex w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}