import { UserSession } from "@/lib/auth/session"
import React from "react"

async function DashboardPage() {
  const user = await UserSession()

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default DashboardPage
