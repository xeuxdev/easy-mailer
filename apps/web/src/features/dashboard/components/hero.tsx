import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"

type DashboardHeroProps = {
  totalAccepted: number | undefined
  totalRejected: number | undefined
  totalPending: number | undefined
}

function DashboardHero({
  totalAccepted,
  totalPending,
  totalRejected,
}: DashboardHeroProps) {
  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      {/* accepted */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accepted</CardTitle>
          <CardDescription>Accepted Emails</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-5">
            <p className="text-xl md:text-2xl">{totalAccepted}</p>
          </div>
        </CardContent>
      </Card>

      {/* rejected */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rejected</CardTitle>
          <CardDescription>Rejected Emails</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-5">
            <p className="text-xl md:text-2xl">{totalRejected}</p>
          </div>
        </CardContent>
      </Card>

      {/* pending */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending</CardTitle>
          <CardDescription>Pending Emails</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-5">
            <p className="text-xl md:text-2xl">{totalPending}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default DashboardHero
