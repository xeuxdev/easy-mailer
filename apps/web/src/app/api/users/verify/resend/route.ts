import { render } from "@react-email/render"
import { AppResponse } from "@/lib/api/response"
import { cookies } from "next/headers"
import VerifyEmail from "@/components/emails/verify-email"
import { siteConfig } from "@/config/site"
import { sendMail } from "@xeuxdev/easymailer"
import jwt from "jsonwebtoken"

type DecodedType = jwt.JwtPayload | { email: string; userName: string }

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("easymailer_user_email")

  let decodedData: DecodedType = {}

  if (!token?.value) {
    return AppResponse("UNAUTHORIZED", 401)
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)
    if (decoded) {
      // console.log(decoded)
      decodedData = decoded as DecodedType
      // res.status(200).json({ decodedData })
    }
  } catch (err: any) {
    // console.log(err.message)
    return AppResponse("Token expired", 400)
  }

  const emailHtml = render(VerifyEmail({ token: token.value }))

  //   return AppResponse(emailHtml, 200)

  const message = {
    from: `xeux  from ${siteConfig.name}`,
    to: decodedData.email,
    subject: "Email Verification Request",
    html: emailHtml,
  }

  const res = await sendMail({
    message: message,
    transport: {
      service: "gmail",
    },
  })

  if (res) {
    return AppResponse("verification email sent", 200)
  } else {
    return AppResponse("something went wrong", 500)
  }
}
