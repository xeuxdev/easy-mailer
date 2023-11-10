export async function GenerateAPIKey(prevState: any) {
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const length = 20 // Length of the batch ID
    let apiKey = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      apiKey += characters[randomIndex]
    }

    return apiKey
  } catch (error) {
    return { message: "failed to generate api key" }
  }
  // setApiKey(apiKey)
}
