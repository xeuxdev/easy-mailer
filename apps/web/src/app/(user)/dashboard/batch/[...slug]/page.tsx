import { BatchInfoTable } from "@/features/dashboard"
import { getBatchDetails } from "../../actions"

export default async function RequestsBatchInfo({
  params,
}: {
  params: { slug: string }
}) {
  const batchInfo = await getBatchDetails(params.slug[0])

  // console.log(batchInfo)

  return (
    <>
      <h1 className="my-10 text-2xl font-bold">Request Info</h1>

      {/*  */}

      <BatchInfoTable batchDetails={batchInfo} />
    </>
  )
}
