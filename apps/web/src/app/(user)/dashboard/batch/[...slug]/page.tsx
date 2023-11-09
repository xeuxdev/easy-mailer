import { BatchInfoTable } from "@/features/dashboard"

export default function RequestsBatchInfo({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <>
      <h1 className="my-10 text-2xl font-bold">Request Info</h1>

      {/*  */}

      <BatchInfoTable />
    </>
  )
}
