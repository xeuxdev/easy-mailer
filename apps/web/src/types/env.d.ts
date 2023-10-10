export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      NEXTAUTH_SECRET: string
      GOOGLE_USER_EMAIL: string | Mail.Address | undefined
      GOOGLE_USER_PASSWORD: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      BASE_URL: string
    }
  }
}
