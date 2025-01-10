"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for the data structures
type PantryTask = {
  _id: string;
  mealName: string;
  ingredients: string[];
  patientName: string;
  patientRoomNumber: string;
  patientId: { bedNumber: string };
};

type DeliveryBoy = {
  _id: string;
  name: string;
};

const PantryDashboard = () => {
  const [pantryData, setPantryData] = useState<{
    tasks: PantryTask[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([]);
  const [selectedDeliveryBoyByTaskId, setSelectedDeliveryBoyByTaskId] = useState<{
    [taskId: string]: string;
  }>({});

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
    const mealStatus = "completed"; // Default status

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold mb-8">Pantry Dashboard</h1>
        <div>
          <Button
            className="mr-4 bg-red-500 hover:bg-red-600"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>

      <table className="min-w-full table-auto bg-white shadow-lg p-4 overflow-x-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-sm font-medium">Meal Name</th>
            <th className="px-4 py-3 text-sm font-medium">Ingredients</th>
            <th className="px-4 py-3 text-sm font-medium">Patient Name</th>
            <th className="px-4 py-3 text-sm font-medium">Room Number</th>
            <th className="px-4 py-3 text-sm font-medium">Bed Number</th>
            <th className="px-4 py-3 text-sm font-medium">Meal Status</th>
            <th className="px-4 py-3 text-sm font-medium">Delivery Boy</th>
            <th className="px-4 py-3 text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {pantryData.tasks.map((task) => (
            <tr key={task._id} className="border-b">
              <td className="px-4 py-2">{task.mealName}</td>
              <td className="px-4 py-2">{task.ingredients.join(", ")}</td>
              <td className="px-4 py-2">{task.patientName}</td>
              <td className="px-4 py-2">{task.patientRoomNumber}</td>
              <td className="px-4 py-2">{task.patientId.bedNumber}</td>
              <td className="px-4 py-2">Completed</td>
              <td className="px-4 py-2">
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
              <td className="px-4 py-2">
                <Button onClick={() => handleUpdateTask(task._id)}>
                  Update Task
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PantryDashboard;
