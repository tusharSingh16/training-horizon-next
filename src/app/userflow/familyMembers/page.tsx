"use client";
import Navbar from "@/components/UserFlow/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    age: "",
    dob: "",
    relationship: "",
    doctorName: "",
    doctorNumber: "",
    bloodGroup: "",
  });

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      const res = await axios.get("http://localhost:3005/api/v1/user/allmembers", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      setFamilyMembers(res.data.familyMembers);
    };
    fetchFamilyMembers();
  }, []);

  const handleEditMember = (member) => {
    setCurrentMember(member);
    setUpdatedInfo({
      name: member.name,
      age: member.age,
      dob: member.dob,
      relationship: member.relationship,
      doctorName: member.doctorName,
      doctorNumber: member.doctorNumber,
      bloodGroup: member.bloodGroup,
    });
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/api/v1/members/${currentMember._id}`, updatedInfo, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        // Update the local state to reflect changes
        setFamilyMembers((prevMembers:any) =>
          prevMembers.map((member:any) => (member._id === currentMember._id ? response.data.updatedMember : member))
        );
        setIsEditing(false);
        setCurrentMember(null);
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-4">
        {familyMembers.map((member, index) => (
          <div
            key={member._id}
            className="bg-white shadow-lg rounded-lg p-6 w-1/4 mx-6 my-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {index + 1}. {member.name}
            </h2>
            <p className="text-gray-700"><strong>Age:</strong> {member.age}</p>
            <p className="text-gray-700"><strong>Date of Birth:</strong> {member.dob.split("T")[0]}</p>
            <p className="text-gray-700"><strong>Relationship:</strong> {member.relationship}</p>
            {member.doctorName && (
              <p className="text-gray-700"><strong>Doctor's Name:</strong> {member.doctorName}</p>
            )}
            {member.doctorNumber && (
              <p className="text-gray-700"><strong>Doctor's Number:</strong> {member.doctorNumber}</p>
            )}
            {member.bloodGroup && (
              <p className="text-gray-700"><strong>Blood Group:</strong> {member.bloodGroup}</p>
            )}
            
            {/* Buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
                onClick={() => handleEditMember(member)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Member Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Family Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={updatedInfo.name}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, name: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Age"
              value={updatedInfo.age}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, age: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={updatedInfo.dob.split("T")[0]}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, dob: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Relationship"
              value={updatedInfo.relationship}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, relationship: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Doctor's Name"
              value={updatedInfo.doctorName}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, doctorName: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Doctor's Number"
              value={updatedInfo.doctorNumber}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, doctorNumber: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Blood Group"
              value={updatedInfo.bloodGroup}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, bloodGroup: e.target.value })}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ml-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
