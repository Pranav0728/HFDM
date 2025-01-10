"use client";

import { useEffect, useState } from "react";

const PatientDietManager = () => {
  const [patients, setPatients] = useState([]);
  const [pantries, setPantries] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [dietName, setDietName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [meals, setMeals] = useState([
    { time: "morning", name: "", ingredients: [], instructions: "" },
    { time: "evening", name: "", ingredients: [], instructions: "" },
    { time: "night", name: "", ingredients: [], instructions: "" },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [patientPantrySelection, setPatientPantrySelection] = useState({}); // Track pantry selection per patient

  // Fetch all patients and pantries
  useEffect(() => {
    const fetchPatientsAndPantries = async () => {
      const patientsResponse = await fetch("/api/patients");
      const patientsData = await patientsResponse.json();

      // Fetch diets for each patient
      const patientsWithDiets = await Promise.all(
        patientsData.map(async (patient) => {
          const dietResponse = await fetch(`/api/diets/${patient._id}`);
          const diet = await dietResponse.json();
          return { ...patient, diet: diet || null };
        })
      );
      setPatients(patientsWithDiets);

      // Fetch pantry data
      const pantriesResponse = await fetch("/api/pantries");
      const pantriesData = await pantriesResponse.json();
      setPantries(pantriesData);
    };

    fetchPatientsAndPantries();
  }, []);

  // Reset form when switching patients or creating a new diet
  const resetForm = () => {
    setDietName("");
    setDescription("");
    setMeals([
      { time: "morning", name: "", ingredients: [], instructions: "" },
      { time: "evening", name: "", ingredients: [], instructions: "" },
      { time: "night", name: "", ingredients: [], instructions: "" },
    ]);
  };

  // Open form for editing or creating diet
  const handleOpenForm = (patient, diet) => {
    setSelectedPatient(patient);
    if (diet && diet.message !== "Diet not found for the given patient") {
      setIsEditing(true);
      setDietName(diet.dietName);
      setDescription(diet.description);
      setMeals(diet.meals);
    } else {
      setIsEditing(false);
      resetForm();
    }
  };

  // Handle meal changes (name, ingredients, or instructions)
  const handleMealChange = (index, field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[index][field] = value;
    setMeals(updatedMeals);
  };

  // Handle adding or removing ingredients
  const handleIngredientChange = (index, ingredients) => {
    const updatedMeals = [...meals];
    updatedMeals[index].ingredients = ingredients.filter(
      (ingredient) => ingredient.trim() !== ""
    );
    setMeals(updatedMeals);
  };

  // Save or Update Diet
  const handleSaveDiet = async () => {
    if (!dietName) {
      alert("Please enter a diet name.");
      return;
    }

    const dietData = {
      dietName,
      description,
      meals: meals.map((meal) => ({
        mealTime: meal.time ? meal.time.toLowerCase() : "",
        name: meal.name,
        ingredients: meal.ingredients,
        instructions: meal.instructions,
      })),
    };

    const endpoint = isEditing
      ? `/api/diets/${selectedPatient._id}` // PUT for update
      : `/api/diets`; // POST for create

    const response = await fetch(endpoint, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dietData, patientId: selectedPatient._id }), // Include patientId
    });

    if (response.ok) {
      alert(
        isEditing ? "Diet updated successfully!" : "Diet created successfully!"
      );
      resetForm();
      setSelectedPatient(null);
    } else {
      const error = await response.json();
      alert(`Error saving diet: ${error.message}`);
    }
  };

  // Handle pantry selection and assignment
  const handlePantrySelectionChange = (patientId, pantryId) => {
    setPatientPantrySelection((prev) => ({
      ...prev,
      [patientId]: pantryId,
    }));
  };

  // Function to handle pantry assignment from the frontend
  const handlePantryAssignment = async (
    patientId,
    pantryId
  ) => {
    try {
      // Construct the request body with all necessary data
      const requestBody = {
        patientId: patientId, // Patient ID selected for the task
        pantryId: pantryId, // Pantry ID selected for the patient
      };

      // Send the PUT request to the backend
      const response = await fetch(`/api/pantry/assigntask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Send the data as a JSON string
      });

      // Check the response status and handle accordingly
      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Task assigned successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error while assigning pantry:", error);
      alert("Error while assigning pantry. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4">Patient Diet Management</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Patient Name</th>
            <th className="border p-2">Assigned Diet</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id} className="hover:bg-gray-50">
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">
                {patient.diet && patient.diet.dietName
                  ? patient.diet.dietName
                  : "No diet assigned"}
              </td>
              <td className="border p-2">
                {patient.diet && patient.diet.message ? (
                  <button
                    onClick={() => handleOpenForm(patient, null)} // Open form for creating diet
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Create Diet
                  </button>
                ) : (
                  <div className="flex space-x-2 md:flex-row items-center">
                    <button
                      onClick={() => handleOpenForm(patient, patient.diet)} // Open form for editing diet
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    >
                      Edit Diet
                    </button>
                    {/* Pantry Assignment Dropdown */}
                    <div className="mb-2 mt-2">
                      <select
                        value={patientPantrySelection[patient._id] || ""}
                        onChange={(e) =>
                          handlePantrySelectionChange(
                            patient._id,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 p-2 rounded-md"
                      >
                        <option value="">Select Pantry</option>
                        {pantries.map((pantry) => (
                          <option key={pantry._id} value={pantry._id}>
                            {pantry.staffName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() =>
                        handlePantryAssignment(
                          patient._id,
                          patientPantrySelection[patient._id]
                        )
                      } // Pass both patientId and pantryId
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Proceed
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Diet Form */}
      {selectedPatient && (
        <div className="mt-6 border p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Diet" : "Create Diet"} for {selectedPatient.name}
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Diet Name"
              value={dietName}
              onChange={(e) => setDietName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Diet Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {meals.map((meal, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{meal.time.charAt(0).toUpperCase() + meal.time.slice(1)} Meal</h3>
              <input
                type="text"
                placeholder="Meal Name"
                value={meal.name}
                onChange={(e) => handleMealChange(index, "name", e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <textarea
                placeholder="Ingredients"
                value={meal.ingredients.join(", ")}
                onChange={(e) =>
                  handleIngredientChange(index, e.target.value.split(","))
                }
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <textarea
                placeholder="Instructions"
                value={meal.instructions}
                onChange={(e) =>
                  handleMealChange(index, "instructions", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={handleSaveDiet}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? "Update Diet" : "Create Diet"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDietManager;
