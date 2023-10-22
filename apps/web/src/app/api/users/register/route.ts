import { AppResponse } from "@/lib/api/response"
import prisma from "@/lib/prisma"
import { validateEmail, validatePassword } from "@/lib/validations"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { render } from "@react-email/render"
import VerifyEmail from "@/components/emails/verify-email"
import { sendMail } from "@xeuxdev/easymailer"

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.email || !body.password || !body.confirmPassword) {
    return AppResponse("Invalid email or password", 400)
  }

  if (
    !validateEmail(body.email) ||
    !validatePassword(body.password) ||
    !validatePassword(body.confirmPassword)
  ) {
    return AppResponse("Invalid email or password", 400)
  }

  if (body.password !== body.confirmPassword) {
    return AppResponse("Passwords do not match", 400)
  }

  const hashedPassword = await bcrypt.hash(body.password, 12)

  const userExists = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (userExists) {
    return AppResponse("user already exists", 400)
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
    },
  })

  const { email } = newUser

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  })

  // console.log(token)

  cookies().set({
    name: "easymailer_user_email",
    value: token,
    httpOnly: true,
    path: "/",
  })

  const emailHtml = render(VerifyEmail({ token: token }))

  //   return AppResponse(emailHtml, 200)

  const message = {
    from: "xeux from Easy Mailer",
    to: email as string,
    subject: "Email Verification Request",
    html: emailHtml,
  }

  await sendMail({
    message: message,
    transport: {
      service: "gmail",
    },
  }).then((res) => {
    console.log(res)
  })

  return AppResponse("User Created successfully", 201)
}
