import axios from "axios"
export async function LoginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const res = await axios.post(`/api/users/login`, {
    email: email.trim(),
    password: password.trim(),
  })

  return res.data
}
