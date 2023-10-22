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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/config/site"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpType, SignupSchema } from "@/lib/validations"
import { PasswordInput } from "@/components/ui/addons/password-input"
import OAuthSignIn from "../components/o-auth"
import { useMutation } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { RegisterUser } from "../services/signup"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

function SignupForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignupSchema),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: RegisterUser,
    mutationKey: ["create-user"],
  })

  const OnSubmit = ({ confirmPassword, password, email }: SignUpType) => {
    console.log(email, password, confirmPassword)

    mutateAsync({ email, password, confirmPassword })
      .then(() => {
        toast.success("User Created successfully")
        router.push("/verify")
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

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
          <form className="space-y-5" onSubmit={handleSubmit(OnSubmit)}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="easymailer@mailer.dev"
                {...register("email")}
              />
              <p className="text-sm text-destructive">
                {errors.email?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput placeholder="*******" {...register("password")} />
              <p className="text-sm text-destructive">
                {errors.password?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <PasswordInput
                placeholder="*******"
                {...register("confirmPassword")}
              />
              <p className="text-sm text-destructive">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex flex-col items-center justify-between mt-6 gap-7 md:flex-row">
              <Button
                type="submit"
                className="w-full px-10"
                disabled={isLoading}
              >
                {isLoading && (
                  <>
                    Signing up....
                    <Loader className="ml-2 animate-spin" />
                  </>
                )}
                {!isLoading && "Sign Up"}
              </Button>
              <OAuthSignIn />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default SignupForm
