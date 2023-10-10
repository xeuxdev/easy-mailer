import { NextResponse } from "next/server"

export const AppResponse = (message: string, status: number) => {
  return NextResponse.json(
    { message: message },

    {
      status: status,
    }
  )
}

export const AppResponseData = (data: any, status: number) => {
  return NextResponse.json(
    data,

    {
      status: status,
    }
  )
}
