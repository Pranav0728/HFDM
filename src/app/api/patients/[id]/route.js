// src/app/api/patients/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Patient from "@/lib/models/Patient";

// GET: Fetch a single patient by ID
export async function GET(request) {
  try {
    const url = new URL(request.url); // Get the URL from the request
    const id = url.searchParams.get('id'); // Get the 'id' query parameter from the URL

    if (!id) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    await dbConnect();
    const patient = await Patient.findById(id);
    if (!patient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json({ message: "Error fetching patient", error }, { status: 500 });
  }
}

// PUT: Update an existing patient by ID
export async function PUT(request) {
  try {
    const url = new URL(request.url); // Get the URL from the request
    const id = url.searchParams.get('id'); // Get the 'id' query parameter from the URL

    if (!id) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    const data = await request.json(); // Parse the incoming request data
    await dbConnect();
    const updatedPatient = await Patient.findByIdAndUpdate(id, data, { new: true });

    if (!updatedPatient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json({ message: "Error updating patient", error }, { status: 500 });
  }
}

// DELETE: Delete a patient by ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url); // Get the URL from the request
    const id = url.searchParams.get('id'); // Get the 'id' query parameter from the URL

    if (!id) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    await dbConnect();
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json({ message: "Error deleting patient", error }, { status: 500 });
  }
}
