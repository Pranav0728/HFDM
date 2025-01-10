import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Patient from "@/lib/models/Patient";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const patients = await Patient.find();
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json({ message: "Error fetching patients", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      diseases,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      age,
      gender,
      contactInfo,
      emergencyContact,
    } = data;

    await dbConnect();
    const newPatient = await Patient.create({
      name,
      diseases,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      age,
      gender,
      contactInfo,
      emergencyContact,
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json({ message: "Error creating patient", error }, { status: 500 });
  }
}
