import { sendMail } from "@xeuxdev/easymailer"

export async function POST(request: Request) {
  const { email } = await request.json()

  console.log(email)

  const response = await sendMail({
    message: {
      from: "mailer",
      html: "Test email from package",
      subject: "test email",
      cc: email,
    },
    transport: {
      service: "gmail",
      // grouped: false,
      // secure: true,
      // pool: false,
    },
  })

  console.log(response)
}
