import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./account"
import API from "./api"

function Settings() {
  return (
    <section className="w-full">
      <Tabs defaultValue="account" className="mx-auto w-full md:max-w-[600px]">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="w-full">
            Account
          </TabsTrigger>
          <TabsTrigger value="api" className="w-full">
            API
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="py-3">
          <Account />
        </TabsContent>
        <TabsContent value="api" className="py-3">
          <API />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Settings
