import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"

type UserSession = {
  email: string
  id: string
  image: string
  name: string
}

export async function UserSession() {
  const session = await getServerSession(authOptions)

  return session?.user as UserSession
}
