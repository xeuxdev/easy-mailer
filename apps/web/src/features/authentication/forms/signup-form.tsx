import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/config/site"

function SignupForm() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            Create your {siteConfig.name} account now!!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>

            <Button>Save password</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default SignupForm
