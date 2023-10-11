"use client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

import React, { useState } from "react"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { Button } from "../../ui/button"
import { Icons } from "@/components/icons"
import { usePathname } from "next/navigation"

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isInDocsPage = pathname.includes("docs")

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-4">
              <p className="flex text-xl font-bold text-primary">EasyMailer</p>

              <Icons.EasyMailer />
            </div>
          </SheetTitle>
        </SheetHeader>

        {isInDocsPage ? (
          <div className="flex flex-col gap-5 py-20">
            {siteConfig.sidebar.map((item) => {
              const isActive = pathname.includes(item.href)
              console.log(pathname)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`capitalize ${
                    isActive
                      ? "font-semibold"
                      : "text-muted-foreground font-medium"
                  }`}
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-10 mt-20">
            {siteConfig.navigations.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={"link"}
                className="pl-0 text-left w-fit"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <Link href={item.href} className="uppercase ">
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
