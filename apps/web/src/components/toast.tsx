"use client"

import React from "react"
import { Toaster } from "react-hot-toast"

function Toast() {
  return (
    <Toaster
      gutter={8}
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,
      }}
    />
  )
}

export default Toast
