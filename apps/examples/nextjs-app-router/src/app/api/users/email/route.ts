import { sendMail } from "@xeuxdev/easymailer"

export async function POST(request: Request) {
  const { email } = await request.json()

  console.log(email)

  const response = await sendMail({
    message: {
      from: "xeux nextjs app router",
      html: "Test email from nextjs app router",
      subject: "Next.js App router example",
      cc: email,
    },
    transport: {
      service: "gmail",
      // grouped: false,
      // secure: true,
      // pool: false,
    },
  })

  return NextResponse.json(
    { message: response.message },
    {
      status: response.status == "failed" ? 500 : 200,
    }
  )

  // console.log(response)
}
