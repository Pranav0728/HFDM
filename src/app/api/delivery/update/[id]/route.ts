import { NextApiRequest, NextApiResponse } from "next";
import DeliveryBoy from "@/lib/models/Delivery";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { deliveryId } = req.query;
    const { isAvailable } = req.body;

    try {
      const deliveryBoy = await DeliveryBoy.findById(deliveryId);
      if (!deliveryBoy) {
        return res.status(404).json({ error: "Delivery Boy not found" });
      }

      // Update the delivery boy's availability
      deliveryBoy.isAvailable = isAvailable !== undefined ? isAvailable : deliveryBoy.isAvailable;
      await deliveryBoy.save();

      res.status(200).json({ message: "Delivery status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update delivery status" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
