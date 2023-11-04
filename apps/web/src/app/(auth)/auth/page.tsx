import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/features/authentication"

export const metadata: Metadata = {
  title: `Sign in to ${siteConfig.name}`,
  description: siteConfig.description,
}

function AuthPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Login to have full access to easymailer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthSignIn />
        </CardContent>
      </Card>
    </>
  )
}

export default AuthPage
