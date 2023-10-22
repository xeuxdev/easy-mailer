import { render } from "@react-email/render"
import { AppResponse } from "@/lib/api/response"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import WelcomeEmail from "@/components/emails/welcome-email"
import { sendMail } from "@xeuxdev/easymailer"
import { siteConfig } from "@/config/site"

type DecodedType = { email: string } | jwt.JwtPayload

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token

  if (!token) {
    return AppResponse("enter token jor", 400)
  }

  const cookieStore = cookies()
  const cookie_token = cookieStore.get("easymailer_user_email")

  if (!cookie_token?.value) {
    redirect("/auth")
  }

  let decodedData: DecodedType = {}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded) {
      // console.log(decoded)
      decodedData = decoded as DecodedType
      // res.status(200).json({ decodedData })
    }
  } catch (err: any) {
    // console.log(err.message)
    return AppResponse("Invalid expired", 401)
  }

  const updateUser = await prisma.user.update({
    where: {
      email: decodedData.email,
    },
    data: {
      emailVerified: true,
    },
  })

  if (!updateUser) {
    return AppResponse("something went wrong", 500)
  }

  const emailHtml = render(WelcomeEmail())

  const emailMessage = {
    from: `Xeux from ${siteConfig.name} `,
    to: updateUser.email as string,
    subject: `Welcome to ${siteConfig.name}`,
    html: emailHtml,
  }

  const res = await sendMail({
    message: emailMessage,
    transport: {
      service: "gmail",
    },
  })

  if (res) {
    cookies().set({
      name: "easymailer_user_email",
      value: "",
      expires: new Date(Date.now()),
      path: "/", // For all paths
    })
    redirect("/auth")
  } else {
    redirect("/verify")
  }
}
