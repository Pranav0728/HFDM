"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

// Define the Patient type
interface Patient {
  _id?: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  diseases: string;
  allergies: string;
  roomNumber: number;
  bedNumber: number;
  floorNumber: number;
  contactInfo: string;
  emergencyContact: string;
}

// Define the Errors type for form validation
interface Errors {
  name?: string;
  age?: string;
  roomNumber?: string;
  bedNumber?: string;
  floorNumber?: string;
  contactInfo?: string;
  emergencyContact?: string;
}

export default function PatientCrud() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState<Patient>({
    name: "",
    age: 0,
    gender: "male",
    diseases: "",
    allergies: "",
    roomNumber: 0,
    bedNumber: 0,
    floorNumber: 0,
    contactInfo: "",
    emergencyContact: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  };

  const validateForm = (): Errors => {
    const formErrors: Errors = {};
    if (!newPatient.name) formErrors.name = "Name is required";
    if (newPatient.age <= 0) formErrors.age = "Age must be a positive number";
    if (!newPatient.roomNumber)
      formErrors.roomNumber = "Room number is required";
    if (!newPatient.bedNumber) formErrors.bedNumber = "Bed number is required";
    if (!newPatient.floorNumber)
      formErrors.floorNumber = "Floor number is required";
    if (!newPatient.contactInfo)
      formErrors.contactInfo = "Contact info is required";
    if (!newPatient.emergencyContact)
      formErrors.emergencyContact = "Emergency contact is required";

    return formErrors;
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });
      const data = await res.json();
      setPatients([...patients, data]);
      setNewPatient({
        name: "",
        age: 0,
        gender: "male",
        diseases: "",
        allergies: "",
        roomNumber: 0,
        bedNumber: 0,
        floorNumber: 0,
        contactInfo: "",
        emergencyContact: "",
      });
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setNewPatient(patient);
  };

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const res = await fetch(`/api/patients/${editingPatient?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });
      const data = await res.json();
      setPatients(
        patients.map((patient) =>
          patient._id === editingPatient?._id ? data : patient
        )
      );
      setEditingPatient(null);
      setNewPatient({
        name: "",
        age: 0,
        gender: "male",
        diseases: "",
        allergies: "",
        roomNumber: 0,
        bedNumber: 0,
        floorNumber: 0,
        contactInfo: "",
        emergencyContact: "",
      });
    }
  };

  const handleDeletePatient = async (id: string) => {
    const res = await fetch(`/api/patients/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message === "Patient deleted successfully") {
      setPatients(patients.filter((patient) => patient._id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>
              {editingPatient ? "Edit Patient" : "Add New Patient"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={
                editingPatient ? handleUpdatePatient : handleCreatePatient
              }
            >
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: +e.target.value })
                    }
                    placeholder="30"
                    className="w-full"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm">{errors.age}</p>
                  )}
                </div>
                <div>
                  <Label>Gender</Label>
                  <select
                    className="border border-gray-300 rounded p-2 w-full"
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        gender: e.target.value as "male" | "female" | "other",
                      })
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label>Diseases</Label>
                  <Textarea
                    value={newPatient.diseases}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, diseases: e.target.value })
                    }
                    placeholder="List of diseases"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Allergies</Label>
                  <Textarea
                    value={newPatient.allergies}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        allergies: e.target.value,
                      })
                    }
                    placeholder="List of allergies"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Room Number</Label>
                  <Input
                    type="number"
                    value={newPatient.roomNumber}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        roomNumber: +e.target.value,
                      })
                    }
                    placeholder="101"
                    className="w-full"
                  />
                  {errors.roomNumber && (
                    <p className="text-red-500 text-sm">{errors.roomNumber}</p>
                  )}
                </div>

                <div>
                  <Label>Bed Number</Label>
                  <Input
                    type="number"
                    value={newPatient.bedNumber}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        bedNumber: +e.target.value,
                      })
                    }
                    placeholder="3"
                    className="w-full"
                  />
                  {errors.bedNumber && (
                    <p className="text-red-500 text-sm">{errors.bedNumber}</p>
                  )}
                </div>

                <div>
                  <Label>Floor Number</Label>
                  <Input
                    type="number"
                    value={newPatient.floorNumber}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        floorNumber: +e.target.value,
                      })
                    }
                    placeholder="2"
                    className="w-full"
                  />
                  {errors.floorNumber && (
                    <p className="text-red-500 text-sm">{errors.floorNumber}</p>
                  )}
                </div>

                <div>
                  <Label>Contact Info</Label>
                  <Input
                    value={newPatient.contactInfo}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        contactInfo: e.target.value,
                      })
                    }
                    placeholder="123-456-7890"
                    className="w-full"
                  />
                  {errors.contactInfo && (
                    <p className="text-red-500 text-sm">{errors.contactInfo}</p>
                  )}
                </div>

                <div>
                  <Label>Emergency Contact</Label>
                  <Input
                    value={newPatient.emergencyContact}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="987-654-3210"
                    className="w-full"
                  />
                  {errors.emergencyContact && (
                    <p className="text-red-500 text-sm">
                      {errors.emergencyContact}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full text-white">
                  {editingPatient ? "Update Patient" : "Add Patient"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="md:col-span-2 lg:col-span-2">
          <Card className="shadow-lg p-6">
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border-b border-gray-200"
                    >
                      <div>
                        <h4 className="font-semibold text-lg">
                          {patient.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Room {patient.roomNumber} - Bed {patient.bedNumber}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          className="bg-yellow-500 text-white"
                          onClick={() => handleEditPatient(patient)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={() => handleDeletePatient(patient._id!)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No patients found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
