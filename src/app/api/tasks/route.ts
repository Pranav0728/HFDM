import { NextResponse } from "next/server";
import Task from "@/lib/models/Task";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();

    // Create a new task
    const newTask = new Task({
      patientId: data.patientId,
      dietChartId: data.dietChartId,
      pantryStaffId: data.pantryStaffId,
      deliveryPersonId: data.deliveryPersonId,
      preparationStatus: data.preparationStatus || "pending",
      deliveryStatus: data.deliveryStatus || "not-started",
      notes: data.notes,
    });

    // Save the task to the database
    await newTask.save();

    return NextResponse.json({ message: "Task created successfully", task: newTask });
  } catch (error: any) {
    console.error("Error creating task:", error.message);
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}


export async function GET(req: Request) {
    try {
      await dbConnect();
  
      const url = new URL(req.url);
      const patientId = url.searchParams.get("patientId");
      const deliveryStatus = url.searchParams.get("deliveryStatus");
  
      const filters: any = {};
  
      if (patientId) filters.patientId = patientId;
      if (deliveryStatus) filters.deliveryStatus = deliveryStatus;
  
      // Fetch tasks based on filters
      const tasks = await Task.find(filters);
  
      return NextResponse.json(tasks);
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
      return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      await dbConnect();
  
      const { taskId, preparationStatus, deliveryStatus, notes } = await req.json();
  
      // Find and update the task
      const task = await Task.findById(taskId);
  
      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
  
      task.preparationStatus = preparationStatus || task.preparationStatus;
      task.deliveryStatus = deliveryStatus || task.deliveryStatus;
      task.notes = notes || task.notes;
      task.timestamps.preparedAt = preparationStatus === "completed" ? new Date() : task.timestamps.preparedAt;
      task.timestamps.deliveredAt = deliveryStatus === "delivered" ? new Date() : task.timestamps.deliveredAt;
  
      await task.save();
  
      return NextResponse.json({ message: "Task updated successfully", task });
    } catch (error: any) {
      console.error("Error updating task:", error.message);
      return NextResponse.json({ message: "Error updating task" }, { status: 500 });
    }
  }
  export async function DELETE(req: Request) {
    try {
      await dbConnect();
  
      const { taskId } = await req.json();
  
      // Delete the task
      const task = await Task.findByIdAndDelete(taskId);
  
      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
      return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
    }
  }