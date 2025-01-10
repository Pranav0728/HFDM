// src/app/api/patients/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Diet from "@/lib/models/Diet";
import mongoose from "mongoose";

export async function GET(req,{ params }) {
  try {
    // Extract the patientId from the URL, assuming the route is `/patients/[id]`
    const { id } =  await params;
    console.log("Fetching diet for patient with ID:", id);
    
    if (!id) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    // Log the ID to check if it's correct
    console.log("Fetching diet for patient with ID:", id);

    // Check if the ID is valid (patientId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Patient ID format" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the diet by patientId (not by _id)
    const diet = await Diet.findOne({ patientId: id }).exec();
    
    if (!diet) {
      return NextResponse.json({ message: "Diet not found for the given patient" }, { status: 404 });
    }

    // Return the diet data
    return NextResponse.json(diet);

  } catch (error) {
    console.error("Error fetching diet:", error);
    return NextResponse.json({ message: "Error fetching diet", error: error.message }, { status: 500 });
  }
}

export async function PUT(req,{ params }) {
  try {
    // Extract patientId from URL parameters (use URL or req.query)
    const { id } = await params

    if (!id) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    // Parse the incoming request data
    const data = await req.json();

    // Validate the patientId (check if it's a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Patient ID format" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the diet by patientId and update it with the new data
    const updatedDiet = await Diet.findOneAndUpdate({ patientId: id }, data, { new: true });

    // If no diet found for the given patientId
    if (!updatedDiet) {
      return NextResponse.json({ message: "Diet not found for the given patient" }, { status: 404 });
    }

    // Return the updated diet data
    return NextResponse.json(updatedDiet);

  } catch (error) {
    console.error("Error updating diet:", error);
    return NextResponse.json({ message: "Error updating diet", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req,{ params }) {
  try {
    // Extract patientId from URL parameters (use URL or req.query)
    const { id } = await params

    if (!id) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    // Validate the patientId (check if it's a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Patient ID format" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the diet by patientId and delete it
    const deletedDiet = await Diet.findOneAndDelete({ patientId: id });

    // If no diet found for the given patientId
    if (!deletedDiet) {
      return NextResponse.json({ message: "Diet not found for the given patient" }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({ message: "Diet deleted successfully" });

  } catch (error) {
    console.error("Error deleting diet:", error);
    return NextResponse.json({ message: "Error deleting diet", error: error.message }, { status: 500 });
  }
}
