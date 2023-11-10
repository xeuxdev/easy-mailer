import { AppResponse, AppResponseData } from "@/lib/api/response"
import { UserSession } from "@/lib/auth/session"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const { email } = await request.json()

  const session = await UserSession()

  //   console.log(session)

  if (!session) {
    return AppResponse("UNAUTHORIZED", 400)
  }

  const User = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!User) {
    return AppResponse("User not found", 404)
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const length = 20 // Length of the batch ID
  let newApiKey = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    newApiKey += characters[randomIndex]
  }

  const checkIfUserHasProfile = await prisma.profile.findFirst({
    where: {
      userId: User.id,
    },
  })

  if (checkIfUserHasProfile) {
    const saveAPiKey = await prisma.profile.update({
      where: {
        userId: User.id,
      },
      data: {
        api_key: newApiKey,
      },
    })

    if (!saveAPiKey) {
      return AppResponse("failed to create api key", 500)
    }
    return AppResponse(saveAPiKey.api_key as string, 200)
  } else {
    const generateAPIKey = await prisma.profile.create({
      data: {
        userId: User.id,
        api_key: newApiKey,
      },
    })

    if (!generateAPIKey) {
      return AppResponse("failed to create API key", 500)
    }

    return AppResponse(generateAPIKey.api_key as string, 200)
  }
}
