import BackButton from "@/components/ui/addons/back-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"

export default function Loading() {
  return (
    <>
      <BackButton />
      <h1 className="my-10 text-2xl font-bold">Request Info</h1>

      <div className="w-full pb-10">
        <div className="flex items-center justify-between py-4">
          <div className="w-full h-12 max-w-sm bg-muted animate-pulse" />
          <div className="w-full h-12 max-w-[8.75rem] bg-muted animate-pulse" />
        </div>
        <div className="border rounded-md ">
          <Table className="min-w-[500px] mx-auto">
            <TableHeader>
              <TableRow className="flex items-center">
                <TableHead className="w-full max-w-md">Time</TableHead>
                <TableHead className="w-full max-w-md">Email</TableHead>
                <TableHead className="w-full max-w-[13rem]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full space-y-2">
              {Array(5)
                .fill(0)
                ?.map((_, idx) => (
                  <TableRow key={idx} className="flex items-center h-[52px]">
                    <TableCell className="w-full h-full max-w-md font-medium bg-muted animate-pulse"></TableCell>
                    <TableCell className="w-full h-full max-w-md font-medium bg-muted animate-pulse"></TableCell>
                    <TableCell className="font-medium bg-muted animate-pulse h-full w-full max-w-[13rem]"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
