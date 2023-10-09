import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-5 py-20">
      {children}
    </main>
  )
}
