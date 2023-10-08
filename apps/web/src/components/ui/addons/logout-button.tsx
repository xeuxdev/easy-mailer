"use client"
import React from "react"
import { Button } from "../button"
import { signOut } from "next-auth/react"

function LogoutButton() {
  return (
    <Button
      className="text-red-500 "
      variant={"ghost"}
      onClick={() => {
        signOut()
      }}
    >
      Log Out
    </Button>
  )
}

export default LogoutButton
