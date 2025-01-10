import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
    name: string;
    age: number;
    gender: "male" | "female" | "other";
    diseases: string[];
    allergies: string[];
    roomNumber: number;
    bedNumber: number;
    floorNumber: number;
    contactInfo: string;
    emergencyContact: string;
  }
  
  const PatientSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    diseases: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    roomNumber: { type: Number, required: true },
    bedNumber: { type: Number, required: true },
    floorNumber: { type: Number, required: true },
    contactInfo: { type: String, required: true },
    emergencyContact: { type: String, required: true },
  });
  
  export default mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);
  