// src/app/api/pantry/dashboard/route.js
import dbConnect from "@/lib/dbConnect";
import Pantry from "@/lib/models/Pantry";  // Assuming Pantry model is available
import Patient from "@/lib/models/Patient";  // Assuming Patient model is available

export async function GET() {
  try {
    // Get the pantry ID from the request URL (e.g., /api/pantry/dashboard/<id>)
    const pantryId = "60c72b1f9e6f8e0b4c8c0f53";

    if (!pantryId) {
      return new Response("Pantry ID is required", { status: 400 });
    }

    await dbConnect();

    // Fetch pantry by its ID and populate the tasks with patient details
    const pantry = await Pantry.findById(pantryId).populate("tasks.patientId"); // Populate patient details in the tasks array

    if (!pantry) {
      return new Response("Pantry not found", { status: 404 });
    }

    // Process and send pantry data including patient details for each task
    const tasksWithPatientDetails = await Promise.all(
      pantry.tasks.map(async (task) => {
        const patient = await Patient.findById(task.patientId); // Fetch patient details
        return {
          ...task.toObject(),
          patientName: patient?.name || "Unknown",
          patientRoomNumber: patient?.roomNumber || "N/A",
        };
      })
    );

    return new Response(
      JSON.stringify({
        staffName: pantry.staffName,
        location: pantry.location,
        contactInfo: pantry.contactInfo,
        tasks: tasksWithPatientDetails,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching pantry data:", error);
    return new Response("Error fetching pantry data", { status: 500 });
  }
}
