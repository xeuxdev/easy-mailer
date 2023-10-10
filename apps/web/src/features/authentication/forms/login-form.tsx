"use client"

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
import { PasswordInput } from "@/components/ui/addons/password-input"
import { useForm } from "react-hook-form"
import { AuthType, authSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import OAuthSignIn from "../components/o-auth"

function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AuthType>({
    resolver: zodResolver(authSchema),
  })

  const OnSubmit = ({ email, password }: AuthType) => {
    console.log(email, "email")
    console.log(password, "password")
  }

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
          <form className="space-y-5" onSubmit={handleSubmit(OnSubmit)}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="easymailer@mailer.dev"
                {...register("email")}
                className="h-12"
              />
              <p className="text-sm text-destructive">
                {errors.email?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                placeholder="*******"
                {...register("password")}
                className="h-12"
              />
              <p className="text-sm text-destructive">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <Button type="submit" className="px-10">
                Login
              </Button>
              <OAuthSignIn />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default LoginForm
