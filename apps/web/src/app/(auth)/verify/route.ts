import WelcomeEmail from "@/components/emails/welcome-email"
import { siteConfig } from "@/config/site"
import { AppResponse } from "@/lib/api/response"
import { UserSession } from "@/lib/auth/session"
import prisma from "@/lib/prisma"
import { render } from "@react-email/render"
import { sendMail } from "@xeuxdev/easymailer"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const session = await UserSession()

  const User = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
  })

  if (!User) {
    return AppResponse("Something went wrong", 500)
  }

  const emailHtml = render(WelcomeEmail())

  const message = {
    from: `xeux from ${siteConfig.name}`,
    to: session.email,
    subject: "Welcome to Easy Mailer",
    html: emailHtml,
  }

  const res = await sendMail({
    message,
    transport: {
      service: "gmail",
    },
  })

  if (res) {
    redirect("/dashboard")
  } else {
    redirect("/auth")
  }
}
