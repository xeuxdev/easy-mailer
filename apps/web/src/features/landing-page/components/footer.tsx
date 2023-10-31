import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { Github, Send } from "lucide-react"
import Link from "next/link"
import React from "react"

function Footer() {
  return (
    <footer className="flex items-center justify-between w-full h-12 px-5">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-4">
          <p className="text-lg font-bold text-primary md:text-xl ">
            {siteConfig.name}
          </p>

          <Send className="text-[#BA1B1B]" strokeWidth={3} />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={"https://github.com/xeuxdev/easy-mailer"}
          target="_blank"
          aria-label="Github"
        >
          <Github className="w-7" />
        </Link>

        <Link href={"https://x.com/xeuxdev"} target="_blank" aria-label="X">
          <Icons.X className="fill-foreground w-7" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
