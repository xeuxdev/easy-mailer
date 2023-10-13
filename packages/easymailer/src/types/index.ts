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
  service: "gmail" | "smtp"
  host?: string
  // port?: number // false = 587 true = 465
  secure?: boolean
  pool?: boolean
  grouped?: boolean
}

export type Response = {
  message: string
  status: "failed" | "successful"
}

// success response
// {
//   accepted: [ 'xeyhuru@gmail.com' ],
//   rejected: [],
//   ehlo: [
//     'SIZE 35882577',
//     '8BITMIME',
//     'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
//     'ENHANCEDSTATUSCODES',
//     'PIPELINING',
//     'CHUNKING',
//     'SMTPUTF8'
//   ],
//   envelopeTime: 816,
//   messageTime: 922,
//   messageSize: 356,
//   response: '250 2.0.0 OK  1695978946 w10-20020adfd4ca000000b0031762e89f94sm20982708wrk.117 - gsmtp',
//   envelope: { from: 'xeuxdev@gmail.com', to: [ 'xeyhuru@gmail.com' ] },
//   messageId: '<83685224-aebc-8a1f-3bc8-e84ed191c528@gmail.com>'
// }

type EmailEnvelope = {
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
