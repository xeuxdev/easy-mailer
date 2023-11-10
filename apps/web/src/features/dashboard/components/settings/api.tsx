"use client"

import { Button } from "@/components/ui/button"
import { CheckCheck, Copy, Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"

export default function API() {
  const [isAPIKeyCopied, setIsAPIKeyCopied] = useState(false)
  const [apiKey, setApiKey] = useState("857264758602847hd")
  const [showAPIKey, setShowAPIKey] = useState(false)

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      setIsAPIKeyCopied(true)
    })

    setTimeout(() => {
      setIsAPIKeyCopied(false)
    }, 2000)
  }

  const handleGenerateAPIKey = () => {
    //  do api request

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const length = 20 // Length of the batch ID
    let apiKey = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      apiKey += characters[randomIndex]
    }

    setApiKey(apiKey)

    toast.success("API key generated successfully")
  }

  return (
    <>
      <p>Your API Key</p>

      <div className="relative flex items-center h-12 pl-5 pr-20 my-8 border-2 rounded-md bg-card border-border">
        <p>{showAPIKey ? apiKey : "xxxxxxxxxxxxxxxxxxx"}</p>

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

      <Button onClick={handleGenerateAPIKey}>Generate new API key</Button>
    </>
  )
}
