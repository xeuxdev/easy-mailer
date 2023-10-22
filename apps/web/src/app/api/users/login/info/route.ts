import { AppResponse, AppResponseData } from "@/lib/api/response"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const body = await request.json()

  const { email } = body

  if (!email) {
    return AppResponse("invalid credentials, ya a bad guy", 400)
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    return AppResponse("not found", 404)
  }

  return AppResponseData(
    {
      id: user.id,
      email: user.email,
    },
    200
  )
}
