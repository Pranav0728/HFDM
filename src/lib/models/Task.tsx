// src/lib/models/Task.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the task status interface
export interface ITask extends Document {
  patientId: mongoose.Types.ObjectId;
  dietChartId: mongoose.Types.ObjectId;
  pantryStaffId?: mongoose.Types.ObjectId;
  deliveryPersonId?: mongoose.Types.ObjectId;
  preparationStatus: "pending" | "in-progress" | "completed";
  deliveryStatus: "not-started" | "out-for-delivery" | "delivered";
  mealStatus: "pending" | "preparing" | "completed"; // New field for meal status
  timestamps: {
    preparedAt?: Date;
    deliveredAt?: Date;
  };
  notes?: string;
}

const TaskSchema: Schema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
  pantryStaffId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  preparationStatus: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  deliveryStatus: { type: String, enum: ["not-started", "out-for-delivery", "delivered"], default: "not-started" },
  mealStatus: { type: String, enum: ["pending" , "preparing" , "completed"], default: "pending" }, // Meal status
  timestamps: {
    preparedAt: { type: Date },
    deliveredAt: { type: Date },
  },
  notes: { type: String },
});

export default mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
