export type UserProfileType = {
  email: string
  name?: string
  image?: string
}

export type EmailEnvelopeResponse = {
  accepted: string[]
  rejected: string[]
  pending: string[]
  response: string
  envelope: {
    from: string
    to: string[]
  }
  messageId: string
  apiKey: string
}
