import mongoose, { Document, Schema } from "mongoose";

export interface IDietChart extends Document {
  patientId: mongoose.Types.ObjectId;
  dietName: string;
  description?: string;
  meals: {
    mealTime: "morning" | "evening" | "night";
    name: string;
    ingredients: string[];
    instructions?: string;
  }[];
}

const DietChartSchema: Schema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  dietName: { type: String, required: true },
  description: { type: String },
  meals: [
    {
      mealTime: { type: String, enum: ["morning", "evening", "night"], required: true },
      name: { type: String, required: true },
      ingredients: { type: [String], default: [] },
      instructions: { type: String },
    },
  ],
});

export default mongoose.models.DietChart || mongoose.model<IDietChart>("DietChart", DietChartSchema);