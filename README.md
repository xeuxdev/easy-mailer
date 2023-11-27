# EasyMailer

## This package is a zero-config helper function to help you send emails in your nodejs apps using nodemailer 🚀🚀

### this package provides support for the following transports

- Gmail
- SMTP

## What you need to use this package

### Intall this package into your project using any package manager

- npm

```bash
    npm i @xeuxdev/easymailer
```

- pnpm

```bash
  pnpm i @xeuxdev/easymailer
```

### Set up your environment variables

- using gmail

  - you need the following environment variables

```js
MAILER_GOOGLE_USER_EMAIL = "example@gmail.com"
MAILER_GOOGLE_USER_PASSWORD = "password"
```

To get the password env, create an app password in your google account

- using smtp

  - you need the following environment variables

```js
MAILER_SMTP_USERNAME = "your smtp username"
MAILER_SMTP_PASSWORD = "your smtp password"
MAILER_SMTP_HOST = "your smtp host"
MAILER_SMTP_PORT = "smtp host"
```

you can get all the above env from your hosting account

## How to work with the package

- import the package into your server code

```js
import { sendMail } from "@xeuxdev/easymailer"
or
const { sendMail } = require("@xeuxdev/easymailer")
```

- call the function with the params

```js
const response = await sendMail({
  message: {},
  transport: {},
})
```

## props

### message

- `from` - `required` - the name of the sender
- `subject` - `required` - The subject of the email
- `html` - `required` - The HTML version of the message
- `plainText` - `required` - The plaintext version of the message
- `attachments` - `required` - An array of attachment objects
- `to` - `optional` - Comma separated list or an array of recipients email addresses that will appear on the To: field
- `cc` - `optional` - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
- `bcc` - `optional` - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field

### transport

- `service`: - `required` - "gmail" | "smtp"
- `secure`: - `optional` - boolean - default: true
- `pool`: - `optional` - boolean - default: true
- `grouped`: - `optional` - boolean - default: true

## Response

- you get a response object after calling the **sendMail()** function

```js
{
  message: string
  status: "failed" | "successful"
}
```

## Compatibility

easymailer is compatible with all server codes, such as express, Nextjs API routes

### Happy Coding
