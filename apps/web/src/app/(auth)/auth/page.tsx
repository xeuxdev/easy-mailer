import { siteConfig } from "@/config/site"
import { AuthTabs } from "@/features/authentication"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: `Sign in to ${siteConfig.name}`,
  description: siteConfig.description,
}

function AuthPage() {
  return (
    <>
      <AuthTabs />
    </>
  )
}

export default AuthPage
