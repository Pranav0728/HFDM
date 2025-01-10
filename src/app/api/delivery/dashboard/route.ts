// pages/api/delivery/dashboard.js

import DeliveryBoy from "@/lib/models/Delivery";
import Pantry from "@/lib/models/Pantry";

export default async function handler(req:any, res:any) {
  if (req.method === "GET") {
    try {
      const deliveryBoys = await DeliveryBoy.find().populate("assignedTasks");
      res.status(200).json(deliveryBoys);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch delivery data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
