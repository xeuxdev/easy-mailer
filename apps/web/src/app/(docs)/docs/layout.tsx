import { DocsSideBar } from "@/features/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-12 container gap-10">
      <DocsSideBar />
      <main className="md:col-span-9 w-full">{children}</main>
    </div>
  )
}
