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
  return <div>DocsPage</div>
}

export default DocsPage
