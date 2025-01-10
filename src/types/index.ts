// types/index.ts

export interface Patient {
    _id: string;
    name: string;
    diseases: string[];
    allergies: string[];
    roomNumber: string;
    bedNumber: string;
    floorNumber: string;
    age: number;
    gender: string;
    contactInfo: string;
    emergencyContact: string;
    // You can add more properties as needed
  }
  
  export interface Meal {
    _id: string;
    morningMeal: string;
    eveningMeal: string;
    nightMeal: string;
    morningInstructions: string;
    eveningInstructions: string;
    nightInstructions: string;
  }
  
  export interface Task {
    _id: string;
    taskName: string;
    assignedTo: string;
    status: "pending" | "completed";
  }
  