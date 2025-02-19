import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signOut } from "next-auth/react";

// Define types
interface PantryData {
  staffName: string;
  location: string;
  contactInfo: string;
  tasks: Task[];
}

interface Task {
  _id: string;
  mealName: string;
  ingredients: string[];
  patientName: string;
  mealStatus: string;
}

interface DeliveryBoy {
  _id: string;
  name: string;
}

const PantryDashboard = () => {
  const [pantryData, setPantryData] = useState<PantryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([]);
  const [selectedDeliveryBoyByTaskId, setSelectedDeliveryBoyByTaskId] =
    useState<Record<string, string>>({});
  const [mealStatusByTaskId, setMealStatusByTaskId] =
    useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPantryData = async () => {
      try {
        const response = await fetch("/api/pantry/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch pantry data");
        }
        const data = await response.json();
        setPantryData(data);
      } catch (error) {
        console.error("Error fetching pantry data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDeliveryBoys = async () => {
      try {
        const response = await fetch("/api/delivery");
        if (!response.ok) {
          throw new Error("Failed to fetch delivery boys");
        }
        const data = await response.json();
        setDeliveryBoys(data);
      } catch (error) {
        console.error("Error fetching delivery boys:", error);
      }
    };

    fetchPantryData();
    fetchDeliveryBoys();
  }, []);

  const handleUpdateTask = async (taskId: string) => {
    const deliveryBoyId = selectedDeliveryBoyByTaskId[taskId];
    const mealStatus = mealStatusByTaskId[taskId] || "pending";

    if (!deliveryBoyId) {
      alert("Please select a delivery boy before assigning.");
      return;
    }

    try {
      const response = await fetch(`/api/diets/update/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deliveryBoyId, mealStatus }),
      });

      if (response.ok) {
        alert("Task updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to update task:", errorData);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!pantryData) return <div>No pantry data available</div>;

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 md:mb-0">Pantry Manager Dashboard</h1>
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>

      <Card className="bg-white shadow-lg p-4 mb-8">
        <h2 className="text-2xl font-semibold">{pantryData.staffName}</h2>
        <p>
          <strong>Location:</strong> {pantryData.location}
        </p>
        <p>
          <strong>Contact Info:</strong> {pantryData.contactInfo}
        </p>
      </Card>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-lg p-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-sm font-medium">Meal Name</th>
              <th className="px-6 py-3 text-sm font-medium">Ingredients</th>
              <th className="px-6 py-3 text-sm font-medium">Patient Name</th>
              <th className="px-6 py-3 text-sm font-medium">Meal Status</th>
              <th className="px-6 py-3 text-sm font-medium">Meal Status</th>
              <th className="px-6 py-3 text-sm font-medium">Delivery Boy</th>
              <th className="px-6 py-3 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {pantryData.tasks.map((task: Task) => (
              <tr key={task._id} className="border-b">
                <td className="px-6 py-4">{task.mealName}</td>
                <td className="px-6 py-4">{task.ingredients.join(", ")}</td>
                <td className="px-6 py-4">{task.patientName}</td>
                <td className="px-6 py-4">{task.mealStatus}</td>
                <td className="px-6 py-4">
                  <Select
                    value={mealStatusByTaskId[task._id] || ""}
                    onValueChange={(value) =>
                      setMealStatusByTaskId((prev) => ({
                        ...prev,
                        [task._id]: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Meal Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4">
                  <Select
                    value={selectedDeliveryBoyByTaskId[task._id] || ""}
                    onValueChange={(value) =>
                      setSelectedDeliveryBoyByTaskId((prev) => ({
                        ...prev,
                        [task._id]: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Delivery Boy" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryBoys.map((deliveryBoy) => (
                        <SelectItem key={deliveryBoy._id} value={deliveryBoy._id}>
                          {deliveryBoy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4">
                  <Button onClick={() => handleUpdateTask(task._id)}>
                    Update Task
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PantryDashboard;
