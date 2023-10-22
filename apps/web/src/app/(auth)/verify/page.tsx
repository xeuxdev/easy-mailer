import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VerifyForm } from "@/features/authentication"
import React from "react"

function VerifyPage() {
  return (
    <Card className="max-w-screen-sm">
      <CardHeader>
        <CardTitle>
          <h1>Verify Your Email</h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <VerifyForm />
      </CardContent>
    </Card>
  )
}

export default VerifyPage
