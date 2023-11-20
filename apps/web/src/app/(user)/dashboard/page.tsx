import { siteConfig } from "@/config/site"
import { DashboardHero, DashboardRequestsTable } from "@/features/dashboard"
import { UserSession } from "@/lib/auth/session"
import { Metadata } from "next"
import { getProfileInfo } from "./actions"

export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
  description: siteConfig.description,
}

async function DashboardPage() {
  const user = await UserSession()

  // fetches the user, profile and event data info for this page
  const profileInfo = await getProfileInfo(user.email)

  return (
    <>
      <h1 className="my-10 text-xl font-bold">Welcome back</h1>

      <DashboardHero
        totalAccepted={profileInfo.totalAcceptedEmails}
        totalRejected={profileInfo.totalRejectedEmails}
        totalPending={profileInfo.totalPendingEmails}
      />

      <DashboardRequestsTable requests={profileInfo.events} />
    </>
  )
}

export default DashboardPage
