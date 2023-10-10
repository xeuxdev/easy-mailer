"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [passwordType, setPasswordType] = React.useState<"password" | "text">(
      "password"
    )

    return (
      <div className="relative flex items-center">
        <input
          type={passwordType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        <div
          onClick={() =>
            setPasswordType(passwordType === "password" ? "text" : "password")
          }
          className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3"
        >
          {passwordType === "password" ? (
            <EyeOff className="w-4" />
          ) : (
            <Eye className="w-4" />
          )}
        </div>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
