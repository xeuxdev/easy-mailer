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
import { siteConfig } from "@/config/site"
import { usePathname } from "next/navigation"

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
              {/* <div className="tracking-wider">
                {user.firstName} {user.lastName}
              </div> */}
              <p className="tracking-wider">{user.userName}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {siteConfig.navigations.map((item) => {
            const isActive = item.href === pathname
            return (
              <DropdownMenuItem
                key={item.name}
                className={`${isActive ? "bg-muted" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`capitalize ${isActive ? "font-semibold" : ""} `}
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link href={"/my-messages"}>My Messages</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Profile
