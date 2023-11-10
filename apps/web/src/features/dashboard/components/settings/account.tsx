"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { useFormState, useFormStatus } from "react-dom"
import { accountFormAction } from "../../actions/account"

const initialState = {
  firstName: "",
  lastName: "",
  message: "",
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button className="w-fit" type="submit" aria-disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}

export default function Account() {
  // get user data here

  const [state, formAction] = useFormState(accountFormAction, initialState)

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-5 md:flex-row">
          <div className="w-full">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              defaultValue={""}
              name="firstName"
              placeholder="First Name"
            />
          </div>

          <div className="w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <Input defaultValue={""} name="lastName" placeholder="Last Name" />
          </div>
        </div>

        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input defaultValue={""} name="email" placeholder="Email" disabled />
        </div>

        <p aria-live="polite" className="">
          {state?.message}
        </p>

        <SubmitButton />
      </form>
    </div>
  )
}
