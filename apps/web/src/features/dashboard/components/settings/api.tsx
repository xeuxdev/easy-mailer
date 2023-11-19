"use client"

import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { CheckCheck, Copy, Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useSession } from "next-auth/react"

export default function API() {
  const [isAPIKeyCopied, setIsAPIKeyCopied] = useState(false)
  const [apiKey, setApiKey] = useState("xxxxxxxxxxxxxxxxxxxx")
  const [showAPIKey, setShowAPIKey] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  const { data: session } = useSession()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/users/profile/api-key", {
        email: session?.user.email,
      })

      return res.data as { message: string }
    },
    mutationKey: ["generate API key"],
  })

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      setIsAPIKeyCopied(true)
    })

    setTimeout(() => {
      setIsAPIKeyCopied(false)
    }, 2000)
  }

  const handleGenerateAPIKey = () => {
    mutateAsync()
      .then((res) => {
        // console.log(res)
        setApiKey(res.message)
        toast.success("API key generated successfully")
        setShowBanner(true)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  return (
    <>
      <p>Your API Key</p>

      {showBanner && (
        <p className="p-2 transition-all duration-300 rounded-md bg-muted">
          Ensure you copy your api key to a secure location as you won&apos;t be
          able to see it again.
        </p>
      )}
      <div className="relative flex items-center h-12 pl-5 pr-20 my-8 border-2 rounded-md bg-card border-border">
        <p>{showAPIKey ? apiKey : "xxxxxxxxxxxxxxxxxxxx"}</p>

        <div className="absolute flex items-center h-full gap-4 -translate-y-1/2 right-3 top-1/2">
          <div
            onClick={() => setShowAPIKey((prev) => !prev)}
            className="cursor-pointer"
          >
            {showAPIKey ? <Eye /> : <EyeOff />}
          </div>
          {isAPIKeyCopied ? (
            <CheckCheck />
          ) : (
            <Copy
              className="cursor-pointer"
              onClick={() => handleCopy(apiKey)}
            />
          )}
        </div>
      </div>

      <Button onClick={handleGenerateAPIKey}>
        {isPending ? "Generating...." : "Generate new API key"}
      </Button>
    </>
  )
}
