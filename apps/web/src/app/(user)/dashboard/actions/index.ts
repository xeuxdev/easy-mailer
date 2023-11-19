"use server"

import prisma from "@/lib/prisma"
import { Session } from "next-auth"

export async function getProfileInfo(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      profile: {
        select: {
          events: true,
        },
      },
    },
  })

  const totalAcceptedEmails = user?.profile?.events.reduce(
    (prev, curr) => (prev += curr.accepted.length),
    0
  )
  const totalRejectedEmails = user?.profile?.events.reduce(
    (prev, curr) => (prev += curr.rejected.length),
    0
  )
  const totalPendingEmails = user?.profile?.events.reduce(
    (prev, curr) => (prev += curr.pending.length),
    0
  )

  return {
    totalAcceptedEmails,
    totalRejectedEmails,
    totalPendingEmails,
    events: user?.profile?.events,
  }
}
