import mongoose from "mongoose";

const PantrySchema = new mongoose.Schema(
  {
    staffName: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tasks: [
      {
        patientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient", // Assuming a 'Patient' collection exists
          required: true,
        },
        mealName: {
          type: String,
          required: true,
        },
        ingredients: [String],
        instructions: String,
        mealStatus: {
          type: String,
          enum: ['pending', 'preparing', 'completed'],
          default: 'pending',
        },
        deliveryBoyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DeliveryBoy", // Assuming a 'DeliveryBoy' collection exists
        },
        preparationStatus: {
          type: String,
          enum: ['pending', 'in-progress', 'completed'],
          default: 'pending',
        },
        deliveryStatus: {
          type: String,
          enum: ['not-started', 'in-progress', 'delivered'],
          default: 'not-started',
        },
        notes: {
          type: String,
          default: '',
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Pantry || mongoose.model("Pantry", PantrySchema);
