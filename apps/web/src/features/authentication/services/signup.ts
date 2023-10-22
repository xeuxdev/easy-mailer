import axios from "axios"
export async function RegisterUser({
  email,
  password,
  confirmPassword,
}: {
  email: string
  password: string
  confirmPassword: string
}) {
  const res = await axios.post(`/api/users/register`, {
    email: email.trim(),
    password: password.trim(),
    confirmPassword: confirmPassword.trim(),
  })

  return res.data
}
