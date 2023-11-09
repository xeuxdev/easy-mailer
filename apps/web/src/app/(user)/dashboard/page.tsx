import { siteConfig } from "@/config/site"
import { DashboardHero, DashboardRequestsTable } from "@/features/dashboard"
import { UserSession } from "@/lib/auth/session"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
  description: siteConfig.description,
}

async function DashboardPage() {
  const user = await UserSession()

  // get user profile info

  return (
    <>
      <h1 className="my-10 text-xl font-bold">Welcome back</h1>

      <DashboardHero />

      <DashboardRequestsTable />
    </>
  )
}

export default DashboardPage
