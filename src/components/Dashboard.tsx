import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PatientCrud from "@/components/PatientCrud";
import DietAssignment from "@/components/DietAssignment";
import Analytics from "@/components/Analytic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { signOut } from "next-auth/react";

export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Dashboard for the Manager to monitor hospital food delivery system.",
};

export default function ManagerDashboardPage() {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header Section */}
        <div className="border-b bg-white shadow">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-2xl font-extrabold text-gray-700">
              Hospital Food Manager Dashboard
            </h1>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 p-6">
          <div className="flex flex-col w-full bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-700">
                Welcome, Manager
              </h2>
              <p className="text-sm text-gray-500">
                Use the tabs below to manage and monitor tasks, patients, and diets effectively.
              </p>
            </div>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="flex space-x-2">
                <TabsTrigger
                  value="overview"
                  className="flex-1 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="diet"
                  className="flex-1 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Diet
                </TabsTrigger>
                <TabsTrigger
                  value="patients"
                  className="flex-1 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                >
                  Patients
                </TabsTrigger>

              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Analytics />
              </TabsContent>

              {/* Diet Tab */}
              <TabsContent value="diet">
                <DietAssignment />
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients">
                <PatientCrud />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
