"use client"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { UserProfileType } from "@/types"
import { usePathname } from "next/navigation"
import LogoutButton from "@/components/ui/addons/logout-button"

function Profile({ user }: { user: UserProfileType }) {
  const [isOpen, setIsOpen] = useState(false)

  const image = `https://api.multiavatar.com/${user.userName}.svg`

  const pathname = usePathname()

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="items-center justify-center">
            <AvatarImage src={image as string} className="h-8" />
            <AvatarFallback>
              {user?.userName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[14rem] mr-2 px-4">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-2">
              <p className="tracking-wider">{user.userName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link
              href={"/dashboard"}
              className={`capitalize font-medium hover:font-semibold `}
            >
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Profile
