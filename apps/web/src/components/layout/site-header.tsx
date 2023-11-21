import React from "react"
import { Send } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../theme/theme-toggle"
import DesktopNav from "./navigations/desktop-nav"
import Profile from "./header/profile"
import { siteConfig } from "@/config/site"
import MobileNav from "./navigations/mobile-nav"
import { Button } from "../ui/button"
import { UserSession } from "@/lib/auth/session"

async function SiteHeader() {
  const userInfo = await UserSession()

  return (
    <header className="py-3 md:py-5">
      <nav className="container flex items-center justify-between bg-background ">
        <Link
          href="/"
          className="flex items-center w-5 md:gap-4"
          aria-label={siteConfig.name}
        >
          <p className="text-sm font-bold text-primary md:text-xl ">
            {siteConfig.name}
          </p>

          <Send className="text-[#BA1B1B]" strokeWidth={3} />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {userInfo ? (
            <Profile user={userInfo} />
          ) : (
            <Button asChild>
              <Link href={"/auth"}>Login</Link>
            </Button>
          )}
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
