// app/api/delivery/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import DeliveryBoy from "@/lib/models/Delivery";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all delivery boys from the database and populate their assigned tasks
    const deliveryBoys = await DeliveryBoy.find().populate("assignedTasks");

    if (!deliveryBoys || deliveryBoys.length === 0) {
      return NextResponse.json({ message: "No delivery boys found" }, { status: 404 });
    }

    // Return all delivery boys data
    return NextResponse.json(deliveryBoys);

  } catch (error) {
    console.error("Error fetching all delivery boys:", error);
    return NextResponse.json({ message: "Error fetching all delivery boys", error: error }, { status: 500 });
  }
}
