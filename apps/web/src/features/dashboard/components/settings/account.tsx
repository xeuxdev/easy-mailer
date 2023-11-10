import { Label } from "@/components/ui/label"
import { UserSession } from "@/lib/auth/session"

export default async function Account() {
  const userInfo = await UserSession()
  // get user data here

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-5 md:flex-row">
        <div className="w-full">
          <Label htmlFor="firstName">First Name</Label>
          <Info info={userInfo.name.split(" ")[0]} />
        </div>

        <div className="w-full">
          <Label htmlFor="lastName">Last Name</Label>
          <Info info={userInfo.name.split(" ")[1]} />
        </div>
      </div>

      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Info info={userInfo.email} />
      </div>
    </div>
  )
}

const Info = ({ info }: { info: string }) => {
  return (
    <div className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      {info}
    </div>
  )
}
