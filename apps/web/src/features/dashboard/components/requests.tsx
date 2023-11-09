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

const requests = [
  {
    requestTime: "10-12-23 - 10:45",
    batchId: "47575hdhjf",
    successfulCount: "250",
    failedCount: "50",
    pendingCount: "30",
  },
  {
    requestTime: "11-15-23 - 14:30",
    batchId: "98sdf7sdf2",
    successfulCount: "200",
    failedCount: "30",
    pendingCount: "45",
  },
  {
    requestTime: "09-28-23 - 08:12",
    batchId: "1a2b3c4d5e",
    successfulCount: "300",
    failedCount: "20",
    pendingCount: "15",
  },
  {
    requestTime: "12-05-23 - 17:55",
    batchId: "6h7i8j9k0l",
    successfulCount: "180",
    failedCount: "70",
    pendingCount: "25",
  },
]

export function DashboardRequestsTable() {
  return (
    <section className="my-10">
      <h2 className="mb-10 text-xl font-bold">Requests Info</h2>

      <Table className="min-w-[500px] mx-auto">
        <TableCaption>A list of your recent requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Batch ID</TableHead>
            <TableHead>Successful</TableHead>
            <TableHead>Failed</TableHead>
            <TableHead>Pending</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.batchId}>
              <TableCell className="font-medium">{req.requestTime}</TableCell>
              <TableCell>{req.batchId}</TableCell>
              <TableCell>{req.successfulCount}</TableCell>
              <TableCell>{req.failedCount}</TableCell>
              <TableCell>{req.pendingCount}</TableCell>
              <TableCell>
                <Menu batchId={req.batchId} />
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
