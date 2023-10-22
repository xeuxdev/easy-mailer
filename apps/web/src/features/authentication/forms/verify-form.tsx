"use client"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

function VerifyForm() {
  const router = useRouter()
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/users/verify/resend")
      return response.data
    },
  })
  const handleResendEmail = async () => {
    mutateAsync()
      .then((res) => {
        toast.success(res.message)
      })
      .catch((err) => {
        if (err.response.data.message === "UNAUTHORIZED") {
          router.replace("/login")
          return
        }
        toast.error(err.response.data.message)
      })
  }

  return (
    <>
      <h2>Thank you for Signing up for {siteConfig.name}</h2>

      <p className="text-muted-foreground">
        We Sent you an email to your email account. Check your Email and verify
        your account. If you can&apos;t find the email, check your spam folder.
      </p>
      <p className="text-muted-foreground">
        Didn&apos;t receive the email?, Click the button below to resend email
      </p>
      <Button variant={"secondary"} onClick={handleResendEmail}>
        {isLoading && (
          <>
            Re-sending...
            <Loader className="ml-2 animate-spin" />
          </>
        )}
        {!isLoading && "Resend Email"}
      </Button>
    </>
  )
}

export default VerifyForm
