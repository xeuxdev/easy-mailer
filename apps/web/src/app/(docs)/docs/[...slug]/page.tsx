import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import React from "react"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `${params.slug} -  ${siteConfig.name} `,
    description: siteConfig.description,
    openGraph: {
      url: `${siteConfig.url}/docs/${params.slug}`,
      title: siteConfig.name,
      description: siteConfig.description,
      type: "website",
      siteName: siteConfig.name,
    },
  }
}

function DocItemPage({ params }: { params: { slug: string } }) {
  return (
    <div className="py-10">
      <h1 className="capitalize">{params.slug}</h1>
    </div>
  )
}

export default DocItemPage
