import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import PatientCrud from "@/components/PatientCrud";
import TaskManager from "@/components/TaskManager";
import DietAssignment from "@/components/DietAssignment";
import Analytics from "@/components/Analytic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { signOut } from "next-auth/react";
export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Dashboard for the Manager to monitor hospital food delivery system.",
}

export default function ManagerDashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Hospital Food Manager Dashboard</h1>
            </div>
            <div>
              <Button
                className="mr-4 bg-red-500 hover:bg-red-600"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
              </div>

          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Manager Dashboard</h2>
           
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="diet" >
                Diet
              </TabsTrigger>
              <TabsTrigger value="patients">
                Patients
              </TabsTrigger>
            </TabsList>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Analytics/>
            </TabsContent>
            <TabsContent value="taskmanager">
            <TaskManager/>
          </TabsContent>
            <TabsContent value="patients">
            <PatientCrud />
          </TabsContent>
            <TabsContent value="diet">
            <DietAssignment/>
          </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
