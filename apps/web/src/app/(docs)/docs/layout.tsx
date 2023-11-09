import { DocsSideBar } from "@/features/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container grid grid-cols-12 gap-10">
      <DocsSideBar />
      <main className="w-full col-span-12 py-10 md:col-span-9">{children}</main>
    </div>
  )
}
