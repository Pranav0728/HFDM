import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default function Analytics() {
  // Use dummy data for analytics
  const analytics = {
    totalPendingTasks: 12,
    totalPreparingTasks: 8,
    totalCompletedTasks: 24,
    totalDeliveries: 15,
    totalActiveStaff: 6,
  };

  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-muted-foreground">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-blue-600">
              {analytics.totalPendingTasks}
            </div>
            <p className="text-sm text-muted-foreground">Pending tasks awaiting delivery</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-muted-foreground">
            <CardTitle className="text-sm font-medium">Preparing Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-yellow-500">
              {analytics.totalPreparingTasks}
            </div>
            <p className="text-sm text-muted-foreground">Tasks currently being prepared</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-muted-foreground">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-green-500">
              {analytics.totalCompletedTasks}
            </div>
            <p className="text-sm text-muted-foreground">Tasks that have been completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-muted-foreground">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-indigo-600">
              {analytics.totalDeliveries}
            </div>
            <p className="text-sm text-muted-foreground">Total deliveries completed today</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-muted-foreground">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-purple-600">
              {analytics.totalActiveStaff}
            </div>
            <p className="text-sm text-muted-foreground">Staff currently working on tasks</p>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
