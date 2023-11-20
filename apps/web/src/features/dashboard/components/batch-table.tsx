"use client"

import * as React from "react"

import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Filters = "accepted" | "rejected" | "pending"

type BatchInfoTableProps = {
  id: string
  batch_id: string
  profileId: string
  accepted: string[]
  rejected: string[]
  pending: string[]
  messageId: string
  eventTime: Date
} | null

const filters: Filters[] = ["accepted", "rejected", "pending"]

export function BatchInfoTable({
  batchDetails,
}: {
  batchDetails: BatchInfoTableProps
}) {
  const [filter, setFilter] = React.useState<Filters>("accepted")

  const filteredData = batchDetails?.[filter]

  return (
    <div className="w-full pb-10">
      <div className="flex items-center py-4">
        <Input placeholder="Filter emails..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto capitalize">
              {filter} <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {filters.map((filter) => (
              <DropdownMenuItem
                key={filter}
                onClick={() => {
                  setFilter(filter)
                }}
                className="capitalize"
              >
                {filter}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-md">
        <Table className="min-w-[500px] mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((req) => (
              <TableRow key={req}>
                <TableCell className="font-medium">
                  {batchDetails?.eventTime.toLocaleString()}
                </TableCell>
                <TableCell>{req}</TableCell>
                <TableCell>{filter}</TableCell>
              </TableRow>
            ))}

            {!filteredData ||
              (filteredData.length < 1 && (
                <div className="flex items-center justify-center w-full h-12 font-semibold text-center capitalize text-muted">
                  no results....
                </div>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
