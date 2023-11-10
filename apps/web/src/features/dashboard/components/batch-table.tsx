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

type Filters = "successful" | "failed" | "pending"

const requests = [
  {
    requestTime: "10-12-23 - 10:45",
    email: "user1@example.com",
    status: "successful",
  },
  {
    requestTime: "11-15-23 - 14:30",
    email: "user2@example.com",
    status: "failed",
  },
  {
    requestTime: "09-28-23 - 08:12",
    email: "user3@example.com",
    status: "pending",
  },
  {
    requestTime: "12-05-23 - 17:55",
    email: "user4@example.com",
    status: "successful",
  },
  {
    requestTime: "08-18-23 - 09:20",
    email: "user5@example.com",
    status: "failed",
  },
  {
    requestTime: "07-22-23 - 11:10",
    email: "user6@example.com",
    status: "pending",
  },
  {
    requestTime: "06-14-23 - 15:35",
    email: "user7@example.com",
    status: "successful",
  },
  {
    requestTime: "05-09-23 - 13:50",
    email: "user8@example.com",
    status: "failed",
  },
  {
    requestTime: "04-01-23 - 18:25",
    email: "user9@example.com",
    status: "pending",
  },
  {
    requestTime: "03-27-23 - 16:15",
    email: "user10@example.com",
    status: "successful",
  },
  {
    requestTime: "02-19-23 - 07:55",
    email: "user11@example.com",
    status: "failed",
  },
  {
    requestTime: "01-14-23 - 22:40",
    email: "user12@example.com",
    status: "pending",
  },
  {
    requestTime: "12-10-22 - 05:30",
    email: "user13@example.com",
    status: "successful",
  },
  {
    requestTime: "11-05-22 - 03:25",
    email: "user14@example.com",
    status: "failed",
  },
  {
    requestTime: "10-02-22 - 12:15",
    email: "user15@example.com",
    status: "pending",
  },
  {
    requestTime: "09-18-22 - 21:10",
    email: "user16@example.com",
    status: "successful",
  },
  {
    requestTime: "08-11-22 - 14:05",
    email: "user17@example.com",
    status: "failed",
  },
  {
    requestTime: "07-06-22 - 17:50",
    email: "user18@example.com",
    status: "pending",
  },
  {
    requestTime: "06-02-22 - 19:45",
    email: "user19@example.com",
    status: "successful",
  },
  {
    requestTime: "05-01-22 - 22:30",
    email: "user20@example.com",
    status: "failed",
  },
]

const filters: Filters[] = ["successful", "failed", "pending"]

export function BatchInfoTable() {
  const [filter, setFilter] = React.useState<Filters>("successful")

  const filteredData = requests.filter((item) => item.status == filter)

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
            {filteredData.map((req) => (
              <TableRow key={req.requestTime}>
                <TableCell className="font-medium">{req.requestTime}</TableCell>
                <TableCell>{req.email}</TableCell>
                <TableCell>{req.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
