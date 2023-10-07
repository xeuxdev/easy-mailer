"use client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Send } from "lucide-react"

import React, { useState } from "react"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { Button } from "../../ui/button"

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-4">
              <p className="hidden text-lg font-bold text-primary md:text-xl lg:text-2xl md:flex">
                Ask Out
              </p>

              <Send />
            </div>
          </SheetTitle>
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
        </SheetHeader>

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
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
