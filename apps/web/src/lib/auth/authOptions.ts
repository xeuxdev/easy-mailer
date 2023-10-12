import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      // @ts-ignore
      async authorize(
        credentials: {
          email: string
          password: string
        },
        req
      ) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/users/login/info`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
          }
        )
        const user = await res.json()

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // console.log(user, profile)
        const payload = {
          email: user.email,
          image: user.image,
          firstName: profile?.given_name,
          lastName: profile?.family_name,
        }
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/users/register/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        )

        const newUser = await res.json()

        if (newUser) {
          return newUser
        } else {
          return null
        }
      }

      return user
    },
    async jwt({ token, user }) {
      // console.log(user)
      // update token
      if (user) {
        token.id = user.id
        token.email = user.email
        token.emailVerified = user.emailVerified
        // token.role = user.role
      }

      // console.log(token)

      // return final token
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.emailVerified = token.emailVerified
      }

      // console.log(session)
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 5,
  },
  pages: {
    signIn: "/login",
  },
}