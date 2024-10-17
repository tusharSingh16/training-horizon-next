"use client"

import Navbar from "@/components/UserFlow/NavBar";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    age: "",
    dob: "",
    relationship: "",
    gender: "",
    address: "",
    city: "",
    postalCode: "",
    doctorName: "",
    doctorNumber: "",
    bloodGroup: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve,1200)); // to test loader 
        const res = await axios.get(
          "http://localhost:3005/api/v1/user/allmembers",
          {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          }
        );
        setFamilyMembers(res.data.familyMembers);
      } catch (error) {
        console.error("Error fetching family members:", error);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };
    fetchFamilyMembers();
  }, []);

  const handleEditMember = (member: any) => {
    setCurrentMember(member);
    setUpdatedInfo({
      name: member.name,
      age: member.age,
      dob: member.dob,
      relationship: member.relationship,
      gender: member.gender,
      address: member.address,
      city: member.city,
      postalCode: member.postalCode,
      doctorName: member.doctorName,
      doctorNumber: member.doctorNumber,
      bloodGroup: member.bloodGroup,
      agreeToTerms: member.agreeToTerms,
    });
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3005/api/v1/members/${currentMember._id}`,
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the local state to reflect changes
        setFamilyMembers((prevMembers: any) =>
          prevMembers.map((member: any) =>
            member._id === currentMember._id
              ? response.data.updatedMember
              : member
          )
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
      <div className="flex flex-wrap space-y-2 justify-center">
        {isLoading ? ( // Display loading icon while data is being fetched
          <div className="flex items-center justify-center h-screen">
            <div className="loader"></div> {/* Add your spinner here */}
          </div>
        ) : familyMembers.length === 0 ? (
          <div className="bg-white p-6 mx-6 my-6 flex flex-col justify-center items-center gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                No members available!{" "}
              </h2>
            </div>
            <div>
              <Link
                href="/userflow/registerMember"
                className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium border border-gray-200 bg-blue-300"
              >
                Register New Member
              </Link>
            </div>
          </div>
        ) : (
          familyMembers.map((member: any, index: any) => (
            <div
              key={member._id}
              className="bg-white shadow-lg rounded-lg p-6 w-1/4 mx-6 my-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {index + 1}. {member.name}
              </h2>
              <p className="text-gray-700">
                <strong>Age:</strong> {member.age}
              </p>
              <p className="text-gray-700">
                <strong>Date of Birth:</strong> {member.dob.split("T")[0]}
              </p>
              <p className="text-gray-700">
                <strong>Relationship:</strong> {member.relationship}
              </p>
              <p className="text-gray-700">
                <strong>Gender:</strong> {member.gender}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {member.address}
              </p>
              <p className="text-gray-700">
                <strong>City:</strong> {member.city}
              </p>
              <p className="text-gray-700">
                <strong>Postal Code:</strong> {member.postalCode}
              </p>
              {member.doctorName && (
                <p className="text-gray-700">
                  <strong>Doctor's Name:</strong> {member.doctorName}
                </p>
              )}
              {member.doctorNumber && (
                <p className="text-gray-700">
                  <strong>Doctor's Number:</strong> {member.doctorNumber}
                </p>
              )}
              {member.bloodGroup && (
                <p className="text-gray-700">
                  <strong>Blood Group:</strong> {member.bloodGroup}
                </p>
              )}
              <p className="text-gray-700">
                <strong>Agreed to Terms:</strong>{" "}
                {member.agreeToTerms ? "Yes" : "No"}
              </p>

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
          ))
        )}
      </div>

      {/* Edit Member Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Family Member</h2>
            {/* Add input fields for editing here */}
            {/* ... */}
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
       <style jsx>{`
              .loader {
        position: relative;
        width: 100px;
        height: 100px;
      }

      .loader:before , .loader:after{
        content: '';
        border-radius: 50%;
        position: absolute;
        inset: 0;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3) inset;
      }
      .loader:after {
        box-shadow: 0 2px 0 #FF3D00 inset;
        animation: rotate 2s linear infinite;
      }

      @keyframes rotate {
        0% {  transform: rotate(0)}
        100% { transform: rotate(360deg)}
      }
      `}</style>

    </>
  );
}
