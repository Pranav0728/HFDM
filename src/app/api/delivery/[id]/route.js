// src/app/api/deliveryBoy/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import DeliveryBoy from "@/lib/models/Delivery";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    // Use searchParams to extract the delivery boy ID
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Get the 'id' from the query parameters

    if (!id) {
      return NextResponse.json({ message: "Delivery Boy ID is required" }, { status: 400 });
    }

    // Check if the ID is valid (delivery boy ID)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Delivery Boy ID format" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the delivery boy by ID and populate assigned tasks
    const deliveryBoy = await DeliveryBoy.findById(id).populate("assignedTasks");

    if (!deliveryBoy) {
      return NextResponse.json({ message: "Delivery Boy not found" }, { status: 404 });
    }

    // Return the delivery boy data
    return NextResponse.json(deliveryBoy);

  } catch (error) {
    console.error("Error fetching delivery boy:", error);
    return NextResponse.json({ message: "Error fetching delivery boy", error: error }, { status: 500 });
  }
}
