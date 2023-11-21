"use client"
import React from "react"
import { Button } from "../button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

function BackButton() {
  const router = useRouter()
  return (
    <Button
      className="flex items-center gap-3"
      variant={"ghost"}
      onClick={() => router.back()}
    >
      <ArrowLeft className="" /> Back
    </Button>
  )
}

export default BackButton
