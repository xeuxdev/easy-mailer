"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = z.object({
  firstName: z.string().min(1, { message: "Please enter first name" }),
  lastName: z.string().min(1, { message: "please enter last name" }),
})

function extractErrorMessages(issues: { message: string }[]) {
  if (issues) {
    return issues.map((issue) => issue.message + " ")
  } else {
    return []
  }
}

export async function accountFormAction(prevState: any, formData: FormData) {
  try {
    const parsed = schema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    })

    console.log(parsed)

    return revalidatePath("/dashboard/settings")
  } catch (error: any) {
    console.log(error.issues)

    const err = extractErrorMessages(error.issues)

    return { message: err ?? error.message }
  }
}
