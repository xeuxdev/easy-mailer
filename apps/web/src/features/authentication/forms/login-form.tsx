"use client"

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
import { LoginType, LoginSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import OAuthSignIn from "../components/o-auth"
import { useMutation } from "@tanstack/react-query"
import { LoginUser } from "../services/login"
import { signIn } from "next-auth/react"
import { Loader } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

function LoginForm() {
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: LoginUser,
    mutationKey: ["login-user"],
  })

  const OnSubmit = ({ email, password }: LoginType) => {
    mutateAsync({ email, password })
      .then((res) => {
        signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        }).then((res) => {
          if (res?.ok) {
            toast.success("login sucsessful")
            router.replace(`/dashboard`)
          }
        })
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        if (err.response.data.message == "verify email") {
          router.push("/verify")
        }
      })
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

            <div className="flex flex-col items-center justify-between mt-6 gap-7 md:flex-row">
              <Button
                type="submit"
                className={`w-full px-10 `}
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : "Login"}
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
