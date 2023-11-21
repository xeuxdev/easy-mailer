import React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

type DashboardRequestsTableProps =
  | {
      id: string
      batch_id: string
      profileId: string
      accepted: string[]
      rejected: string[]
      pending: string[]
      messageId: string
      eventTime: Date
    }[]
  | undefined

export function DashboardRequestsTable({
  requests,
}: {
  requests: DashboardRequestsTableProps
}) {
  return (
    <section className="my-10">
      <h2 className="mb-10 text-xl font-bold">Requests Info</h2>

      <Table className="min-w-[500px] mx-auto">
        <TableCaption>A list of your recent requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Batch ID</TableHead>
            <TableHead className="text-left">Accepted</TableHead>
            <TableHead>Rejected</TableHead>
            <TableHead>Pending</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium">
                {new Date(req.eventTime).toLocaleString()}
              </TableCell>
              <Link href={`/dashboard/batch/${req.batch_id}`}>
                <TableCell>{req.batch_id}</TableCell>
              </Link>
              <TableCell className="text-left">{req.accepted.length}</TableCell>
              <TableCell>{req.rejected.length}</TableCell>
              <TableCell>{req.pending.length}</TableCell>
              <TableCell>
                <Menu batchId={req.batch_id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

const Menu = ({ batchId }: { batchId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/dashboard/batch/${batchId}`}>Batch Info</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
