import type { User } from "next-auth"
import "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    emailVerified: boolean | Date | null
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
  interface User {
    emailVerified: boolean | Date | null
  }

  interface Profile {
    given_name: string
    family_name: string
  }
}
