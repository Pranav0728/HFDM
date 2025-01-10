import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";  // Database connection utility
import Pantry from "@/lib/models/Pantry";  // Pantry model
import Patient from "@/lib/models/Patient";  // Assuming you have a Patient model
import DietChart from "@/lib/models/Diet";  // DietChart model
import mongoose from "mongoose";

export async function PUT(req: Request) {
  try {
    // Extract pantryId and patientId from the body
    const { pantryId, patientId } = await req.json();

    // Validate input fields
    if (!mongoose.Types.ObjectId.isValid(pantryId) || !mongoose.Types.ObjectId.isValid(patientId)) {
      return NextResponse.json({ message: "Invalid Pantry or Patient ID format" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the pantry by its ID
    const pantry = await Pantry.findById(pantryId);
    console.log("Pantry found:", pantry);
    if (!pantry) {
      return NextResponse.json({ message: "Pantry not found" }, { status: 404 });
    }

    // Find the patient by its ID (validate that the patient exists)
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    } 

    // Find the patient's diet from the DietChart collection
    const diet = await DietChart.findOne({ patientId }); // Assuming the DietChart collection is linked by patientId
    if (!diet) {
      return NextResponse.json({ message: "No diet assigned to this patient" }, { status: 404 });
    }

    // Add the task details to the pantry's tasks array for all meals
    diet.meals.forEach((meal) => {
      pantry.tasks.push({
        patientId,
        mealName: meal.name,
        ingredients: meal.ingredients,
        instructions: meal.instructions,
      });
    });

    // Save the updated pantry document
    await pantry.save();

    // Return success response
    return NextResponse.json({ message: "Task assigned to pantry successfully" });

  } catch (error) {
    console.error("Error assigning task:", error);
    return NextResponse.json({ message: "Error assigning task", error: error.message }, { status: 500 });
  }
}
