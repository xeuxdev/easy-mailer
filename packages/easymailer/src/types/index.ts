export type Attachment = {
  filename?: string
  content?: string | Buffer
  path?: string
  href?: string | URL
  contentType?:
    | string
    | "text/plain"
    | "image/png"
    | "image/jpeg"
    | "image/webp"
  encoding?: string
  cid?: string
  raw?: string
}

export type Message = {
  from: string
  to?: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  plainText?: string
  html: string | Buffer | Object
  attachments?: Attachment[]
}

export type Transport = {
  /** Define the email service you want to use either @params {gmail} or @params {smtp} */
  service: "gmail" | "smtp"
  host?: string
  // port?: number // false = 587 true = 465
  /** defines if the connection should use SSL (if true) or not (if false) defaults to true */
  secure?: boolean
  pool?: boolean
  /** Determine if the emails should be grouped together or not defaults to {true} */
  grouped?: boolean
}

export type Response = {
  message: string
  status: "failed" | "successful"
}

export type EmailEnvelopeResponse = {
  accepted: string[]
  rejected: string[]
  ehlo: string[]
  envelopeTime: number
  messageTime: number
  messageSize: number
  response: string
  envelope: {
    from: string
    to: string[]
  }
  messageId: string
}
