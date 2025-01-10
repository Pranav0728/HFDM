// src/app/api/delivery/update/[id]/route.js
import { NextResponse } from "next/server";
import DeliveryBoy from "@/lib/models/Delivery";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
  const { id } = params; // Get the deliveryId from params
  const { isAvailable } = await req.json(); // Get the updated availability status from the request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid Delivery Boy ID format" }, { status: 400 });
  }

  try {
    // Find the delivery boy by ID
    const deliveryBoy = await DeliveryBoy.findById(id);
    if (!deliveryBoy) {
      return NextResponse.json({ error: "Delivery Boy not found" }, { status: 404 });
    }

    // Update the delivery boy's availability
    deliveryBoy.isAvailable = isAvailable !== undefined ? isAvailable : deliveryBoy.isAvailable;
    await deliveryBoy.save();

    return NextResponse.json({ message: "Delivery status updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update delivery status" }, { status: 500 });
  }
}
