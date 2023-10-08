import React from "react"
import { cookies } from "next/headers"
import { Send } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../theme/theme-toggle"
import DesktopNav from "./navigations/desktop-nav"
import Profile from "./header/profile"
import { siteConfig } from "@/config/site"
import MobileNav from "./navigations/mobile-nav"

async function SiteHeader() {
  // const token = cookies().get("anony_user_info")

  // console.log(userInfo)

  return (
    <header className="py-3 md:py-5">
      <nav className="container flex items-center justify-between bg-background ">
        <Link href="/" className="flex items-center gap-4">
          <p className="text-lg font-bold text-primary md:text-xl ">
            {siteConfig.name}
          </p>

          <Send className="text-[#BA1B1B]" strokeWidth={3} />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Profile
            user={{
              email: "xeuxdev@gmail.com",
              userName: "xeuxdev",
            }}
          />
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
