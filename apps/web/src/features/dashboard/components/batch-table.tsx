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
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredData = batchDetails?.[filter]

  const filteredDataWithSearch = filteredData?.filter((data) =>
    data.includes(searchQuery)
  )

  return (
    <div className="w-full pb-10">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          className="max-w-sm"
          onChange={(e) => {
            setTimeout(() => {
              setSearchQuery(e.target.value)
            }, 200)
          }}
        />
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
      <div className="border rounded-md ">
        <Table className="min-w-[500px] mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {filteredDataWithSearch?.map((item) => (
              <TableRow key={item}>
                <TableCell className="font-medium">
                  {batchDetails?.eventTime.toLocaleString()}
                </TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{filter}</TableCell>
              </TableRow>
            ))}

            {!filteredData ||
              (filteredData.length < 1 && (
                <div className="flex items-center justify-center h-12 mx-auto font-semibold text-center text-muted-foreground">
                  <p> No Results....</p>
                </div>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
