import { sendMail } from "@xeuxdev/easymailer"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  const response = await sendMail({
    message: {
      from: "xeux nextjs pages router",
      html: "Test email from nextjs pages router",
      subject: "Next.js pages router example",
      cc: email,
    },
    transport: {
      service: "gmail",
      // grouped: false,
      // secure: true,
      // pool: false,
    },
  })

  res
    .status(response.status == "failed" ? 500 : 200)
    .json({ message: response.message })
}
