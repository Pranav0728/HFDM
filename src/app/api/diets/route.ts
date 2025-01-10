import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Diet from "@/lib/models/Diet";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data); // This logs the incoming data

    const {
      patientId,
      dietName,
      description, // Optional description from the client
      meals, // Meals array
    } = data;

    // Ensure that meals is an array with required fields (morning, evening, night)
    if (!Array.isArray(meals) || meals.length !== 3) {
      return NextResponse.json(
        { message: "Meals should be an array with 3 entries (morning, evening, night)" },
        { status: 400 }
      );
    }

    // Ensure that each meal contains the required fields (mealTime, name, ingredients)
    for (const meal of meals) {
      if (!meal.mealTime || !meal.name || !Array.isArray(meal.ingredients)) {
        return NextResponse.json(
          { message: "Each meal must have mealTime, name, and ingredients" },
          { status: 400 }
        );
      }
    }

    // Connect to the database
    await dbConnect();

    // Create a new Diet document based on the schema
    const newDiet = await Diet.create({
      patientId,
      dietName,
      description, // Optional description
      meals, // Meals array will be stored as-is
    });

    return NextResponse.json(newDiet, { status: 201 });
  } catch (error) {
    console.error("Error creating diet:", error);
    return NextResponse.json({ message: "Error creating diet", error }, { status: 500 });
  }
}
