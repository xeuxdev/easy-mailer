import { siteConfig } from "@/config/site"
import { Settings } from "@/features/dashboard"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Settings",
  description: siteConfig.description,
}
export default function SettingsPage() {
  return (
    <>
      <section className="my-10 ">
        <h1 className="mb-4 text-2xl font-bold">Settings</h1>

        <p className="">Manage your settings here</p>
      </section>

      {/*  */}

      <Settings />
    </>
  )
}
