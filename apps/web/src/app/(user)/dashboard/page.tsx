import { UserSession } from "@/lib/auth/session"
import React from "react"

async function DashboardPage() {
  const user = await UserSession()

  return <div>{JSON.stringify(user, null, 2)}</div>
}

export default DashboardPage
