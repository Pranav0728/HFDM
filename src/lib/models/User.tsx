import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // Hashed password
  role: "manager" | "pantry" | "delivery";
  contactInfo?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["manager", "pantry", "delivery"], required: true },
  contactInfo: { type: String },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
