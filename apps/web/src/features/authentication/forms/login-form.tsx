import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function LoginForm() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your {siteConfig.name} account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
            <Button>Save changes</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default LoginForm
