// src/app/api/delivery/dashboard/route.ts
import { NextResponse } from "next/server";
import DeliveryBoy from "@/lib/models/Delivery";

export async function GET() {
  try {
    const deliveryBoys = await DeliveryBoy.find().populate("assignedTasks");
    return NextResponse.json(deliveryBoys);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch delivery data" }, { status: 500 });
  }
}
