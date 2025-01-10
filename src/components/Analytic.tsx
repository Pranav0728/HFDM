import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";


export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalPendingTasks: 0,
    totalPreparingTasks: 0,
    totalCompletedTasks: 0,
    totalDeliveries: 0,
    totalActiveStaff: 0,
  });

  useEffect(() => {
    async function getAnalytics() {
      try {
        const res = await fetch("/api/pantries");
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setAnalytics(data);
        } else {
          console.error("Failed to fetch analytics data");
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    }
    getAnalytics();
  }, []);

  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPendingTasks}</div>
            <p className="text-xs text-muted-foreground">Pending tasks awaiting delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preparing Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPreparingTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks currently being prepared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCompletedTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks that have been completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalDeliveries}</div>
            <p className="text-xs text-muted-foreground">Total deliveries completed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalActiveStaff}</div>
            <p className="text-xs text-muted-foreground">Staff currently working on tasks</p>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
