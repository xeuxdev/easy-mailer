"use client"
import { siteConfig } from "@/config/site"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

function DocsSideBar() {
  const pathname = usePathname()

  return (
    <aside className="col-span-3 md:flex flex-col gap-2 py-10 hidden ">
      {siteConfig.sidebar.map((item) => {
        const isActive = pathname.includes(item.href)
        console.log(pathname)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`capitalize ${
              isActive ? "font-semibold" : "text-muted-foreground font-medium"
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </aside>
  )
}

export default DocsSideBar