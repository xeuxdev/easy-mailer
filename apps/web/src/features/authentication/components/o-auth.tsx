"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import React from "react"

function OAuthSignIn() {
  const handleGoogleSignin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    })
  }

  return (
    <Button
      variant={"secondary"}
      className="w-full"
      onClick={handleGoogleSignin}
      type="button"
    >
      Sign in with Google
    </Button>
  )
}

export default OAuthSignIn
