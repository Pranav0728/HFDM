// src/app/api/pantry/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Pantry from "@/lib/models/Pantry";

export async function PUT(req, { params }) {
  await dbConnect(); // Ensure database connection

  const { id } = params; // Extract task ID from route parameters

  try {
    const body = await req.json(); // Parse JSON body
    const { deliveryBoyId, mealStatus, notes } = body;

    // Validate the `mealStatus`
    const validMealStatuses = ["pending", "preparing", "completed"];
    if (!validMealStatuses.includes(mealStatus)) {
      return NextResponse.json({ error: "Invalid meal status" }, { status: 400 });
    }

    // Find and update the task in the `Pantry` collection
    const pantry = await Pantry.findOneAndUpdate(
      { "tasks._id": id }, // Match the subdocument by ID
      {
        $set: {
          "tasks.$.status": "completed",
          "tasks.$.deliveryBoyId": deliveryBoyId,
          "tasks.$.mealStatus": mealStatus,
          ...(notes && { "tasks.$.notes": notes }), // Update notes only if provided
        },
      },
      { new: true } // Return the updated document
    );

    // If the task was not found
    if (!pantry) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Success response
    return NextResponse.json(
      { message: "Task updated successfully", pantry },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task", details: error },
      { status: 500 }
    );
  }
}
