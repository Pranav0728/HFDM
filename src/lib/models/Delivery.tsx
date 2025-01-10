// models/Delivery.js

import mongoose from "mongoose";

const DeliveryBoySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pantry", // Reference to tasks from the Pantry collection
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DeliveryBoy || mongoose.model("DeliveryBoy", DeliveryBoySchema);
