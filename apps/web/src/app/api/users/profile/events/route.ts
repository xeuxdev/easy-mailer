import { AppResponse, AppResponseData } from "@/lib/api/response"
import prisma from "@/lib/prisma"
import { EmailEnvelopeResponse } from "@/types"

function generateBatchId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let result = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomIndex)
  }

  return result
}

export async function POST(request: Request) {
  const { payload } = (await request.json()) as {
    payload: EmailEnvelopeResponse
  }

  const ProfileInfo = await prisma.profile.findUnique({
    where: {
      api_key: payload.apiKey,
    },
  })

  if (!ProfileInfo) {
    return AppResponse("bad guy, i see you", 400)
  }

  const emailEvent = await prisma.emailBatch.create({
    data: {
      batch_id: generateBatchId(10),
      messageId: payload.messageId,
      accepted: payload.accepted,
      rejected: payload.rejected,
      pending: payload.pending,
      profileId: ProfileInfo.id,
    },
  })

  console.log(emailEvent)

  return AppResponseData(emailEvent, 201)
}
