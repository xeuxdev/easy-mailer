"use client"
import React from "react"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import Link from "next/link"

function DesktopNav() {
  const pathname = usePathname()

  return (
    <div className="items-center hidden gap-7 md:flex">
      {siteConfig.navigations.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            href={item.href}
            key={item.name}
            className={`${
              isActive ? "font-bold " : "text-muted-foreground"
            } capitalize`}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}

export default DesktopNav
