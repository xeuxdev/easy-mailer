"use client"
import { useMediaQuery } from "@/hooks/use-media-query"
import React from "react"

function DocsSideBar() {
  const matches = useMediaQuery("(min-width: 768px)")

  if (!matches) {
    return null
  }
  return <aside className="col-span-3 ">DocsSideBar</aside>
}

export default DocsSideBar
