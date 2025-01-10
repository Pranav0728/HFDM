import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";  // Your database connection utility
import Pantry from "@/lib/models/Pantry";  // Assuming Pantry is a Mongoose model

export async function GET(req: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all pantry staff records
    const pantryStaff = await Pantry.find()

    if (!pantryStaff || pantryStaff.length === 0) {
      return NextResponse.json({ message: "No pantry staff found" }, { status: 404 });
    }

    // Return all pantry staff details along with their assigned tasks
    return NextResponse.json(pantryStaff);

  } catch (error) {
    console.error("Error fetching pantry details:", error);
    return NextResponse.json({ message: "Error fetching pantry details", error: error }, { status: 500 });
  }
}
