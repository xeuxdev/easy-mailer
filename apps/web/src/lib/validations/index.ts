import { z } from "zod"

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])(?!.*\s).{7,}$/

export const authSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "must be at least 7 characters" })
    .regex(passwordRegex, {
      message:
        "must contain at least one uppercase, lowercase, digit, and special characters",
    }),
})

export type AuthType = z.infer<typeof authSchema>

const emailSchema = z.string().email()

const passwordSchema = z.string().min(7).regex(passwordRegex)

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email)
    return true
  } catch (error) {
    return false
  }
}

export const validatePassword = (password: string) => {
  try {
    passwordSchema.parse(password)
    return true
  } catch (error) {
    return false
  }
}

export const PasswordResetSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(7, { message: "must be at least 7 characters" })
      .regex(passwordRegex, {
        message:
          "must contain at least one uppercase, lowercase, digit, and special characters",
      }),
    confirmPassword: z
      .string({ required_error: "must be at least 7 characters" })
      .min(7, { message: "Passwords do not match " })
      .max(100),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  })

export type PasswordResetType = z.infer<typeof PasswordResetSchema>

export const SignupSchema = z
  .object({
    email: z
      .string({ required_error: "Please enter your email address" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(7, { message: "must be at least 7 characters" })
      .regex(passwordRegex, {
        message:
          "must contain at least one uppercase, lowercase, digit, and special characters",
      }),
    confirmPassword: z
      .string({ required_error: "must be at least 7 characters" })
      .min(7, { message: "Passwords do not match " })
      .max(100),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  })

export type SignUpType = z.infer<typeof SignupSchema>
