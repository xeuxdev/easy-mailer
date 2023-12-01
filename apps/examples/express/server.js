// Import required modules
const express = require("express")
require("dotenv").config()
const { sendMail } = require("@xeuxdev/easymailer")

// Create an Express application
const app = express()
app.use(express.json())

// Define a route
app.post("/", async (req, res) => {
  const { email } = req.body

  const response = await sendMail({
    message: {
      from: "John Express",
      html: "Hey this is a message from express",
      bcc: email,
      subject: "Test Email From Express",
    },
    transport: {
      service: "smtp",
    },
  })

  res.status(200).json(response)
})

// Start the server
const PORT = 3010
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
