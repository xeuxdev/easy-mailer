import nodemailer from "nodemailer"
import { Message, Response, Transport } from "../types"

/**
 * Sends an email using the provided message and transport options.
 *
 * @param {Object} options - The options for sending the email.
 * @param {Message} options.message - The message object containing the email details.
 * @param {Transport} options.transport - The transport options for sending the email.
 * @throws {Error} Throws an error if required environment variables are not set.
 * @return {Response} The response object containing the status and message of the email sending process.
 */
export async function sendMail({
  message,
  transport,
}: {
  message: Message
  transport: Transport
}) {
  // response to be returned
  let response: Response = {
    message: "",
    status: "failed",
  }

  // google envs
  const GOOGLE_EMAIL = process.env.MAILER_GOOGLE_USER_EMAIL?.replace(
    /['"]+/g,
    ""
  )
  const GOOGLE_PASSWORD = process.env.MAILER_GOOGLE_USER_PASSWORD?.replace(
    /['"]+/g,
    ""
  )

  // smtp transport envs
  const SMTP_USER = process.env.MAILER_SMTP_USERNAME?.replace(/['"]+/g, "")
  const SMTP_PASSWORD = process.env.MAILER_SMTP_PASSWORD?.replace(/['"]+/g, "")
  const SMTP_HOST = process.env.MAILER_SMTP_HOST?.replace(/['"]+/g, "")
  const SMTP_PORT = process.env.MAILER_SMTP_PORT?.replace(/['"]+/g, "")

  // google validation
  if (transport.service === "gmail" && (!GOOGLE_EMAIL || !GOOGLE_PASSWORD)) {
    throw new Error("No env variables, please add needed environment variables")
  }

  // smtp validation
  if (
    transport.service === "smtp" &&
    (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT)
  ) {
    throw new Error("No env variables, please add needed environment variables")
  }

  // init transporter
  let transporter

  if (transport.service === "gmail") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_PASSWORD,
      },
    })
  } else if (transport.service === "smtp") {
    transporter = nodemailer.createTransport({
      // @ts-ignore
      pool: transport.pool ?? true,
      host: SMTP_HOST,
      secure: transport.secure ?? true,
      port: SMTP_PORT ?? transport.secure === true ? 465 : 587,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    })
  }

  const user = transport.service === "gmail" ? GOOGLE_EMAIL : SMTP_USER

  const messageToBeSent = {
    from: {
      name: message.from,
      address: user as string,
    },
    to: message.to,
    bcc: message.bcc,
    cc: message.cc,
    subject: message.subject,
    html: message.html,
    text: message.plainText,
    attachments: message.attachments,
    headers:
      transport.grouped == false
        ? {
            "X-Entity-Ref-ID": crypto.randomUUID(),
          }
        : undefined,
  }

  await transporter
    ?.sendMail(messageToBeSent)
    .then((res) => {
      response = {
        message: res.response.match(/^(\d+)/)?.[1]
          ? "email sent successfully"
          : "",
        status: "successful",
      }
      // make api req to endpoint if it exists
    })
    .catch((err) => {
      // make api req to endpoint if it exist
      response = {
        message: err.message
          .split("Learn more at")[0]
          .replace(/535-5.7.8/g, "")
          .trim(),
        status: "failed",
      }
      // response = err.message.split("Learn more at")[0].trim()
    })

  return response
}
