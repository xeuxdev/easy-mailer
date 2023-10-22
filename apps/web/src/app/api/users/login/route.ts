import { AppResponse, AppResponseData } from "@/lib/api/response"
import prisma from "@/lib/prisma"
import { validateEmail, validatePassword } from "@/lib/validations"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; password: string }

  if (!body.email || !body.password) {
    return AppResponse("Invalid email or password", 400)
  }

  if (!validateEmail(body.email) || !validatePassword(body.password)) {
    return AppResponse("Invalid email or password", 400)
  }

  const User = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (!User) {
    return AppResponse("User does not exist", 404)
  }

  const isPasswordValid = await bcrypt.compare(
    body.password,
    User.password as string
  )

  if (!isPasswordValid) {
    return AppResponse("invalid credentials", 400)
  }

  if (!User.emailVerified) {
    const { email } = User

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 5 * 24 * 60 * 60,
    })

    cookies().set({
      name: "easymailer_user_info",
      value: token,
      httpOnly: true,
      path: "/",
    })
    return AppResponse(`verify email`, 401)
  }

  cookies().set({
    name: "easymailer_user_info",
    value: "",
    expires: new Date(Date.now()),
    path: "/", // For all paths
  })

  return AppResponse("login sucsessful", 200)
}
