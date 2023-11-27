// Import required modules
const express = require("express")
require("dotenv").config()
const { sendMail } = require("@xeuxdev/easymailer")

// Create an Express application
const app = express()

// Define a route
app.get("/", async (req, res) => {
  const response = await sendMail({
    message: {
      from: "John Express",
      html: "Hey this is a message from express",
      bcc: [
        "email1@gmail.com",
        "wmail2@gmail.com",
        "email3@gmail.com",
        "email4@gmail.com",
      ],
      subject: "Test Email From Express",
    },
    transport: {
      service: "gmail",
    },
  })

  res.status(200).json(response)
})

// Start the server
const PORT = 3010
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
