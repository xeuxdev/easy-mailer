import { siteConfig } from "@/config/site"
import { type Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: `${siteConfig.name} Docs`,
  description: siteConfig.description,
  openGraph: {
    url: `${siteConfig.url}/docs`,
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
  },
}

function DocsPage() {
  return (
    <>
      <h1 className="text-xl lg:text-4xl my-5">
        Welcome to the Easy Mailer Documentation
      </h1>

      <p>
        Easy Mailer is a helper function to help you send emails using
        nodemailer 🚀🚀
      </p>
    </>
  )
}

export default DocsPage
