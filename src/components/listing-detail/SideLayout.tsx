"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import React, { useEffect, useState } from "react";
import ReplyToListing from "./ReplyToListing";
import MapWidget from "./MapWidget";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SideLayout({
  minAgeLimit,
  maxAgeLimit,
  listingId,
  trainerPhone,
}: {
  minAgeLimit: number;
  maxAgeLimit: number;
  listingId: string;
  trainerPhone: string;
}) {
  const [name, setName] = useState("user");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useSelector((state: RootState) => state.form);
  const tabs = ["Overview", "Instructors", "Curriculum", "Reviews", "FAQs"];
  // useEffect(()=>  {
  //   // console.log(minAgeLimit, maxAgeLimit)
  //   console.log(form.title),
  //       console.log(form.ageGroup)
  // })
  // Fetch the username and members
  useEffect(() => {
    const fetchUserName = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/username`,
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      setName(res.data.user);
    };
    const fetchMembers = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/allmembers`,
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      setMembers(res.data.familyMembers);
    };

    fetchUserName();
    fetchMembers();
  }, []);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    closePopup();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/review/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, review, rating }),
      }
    );

    if (response.ok) {
      alert("Review submitted!");
      setName("");
      setReview("");
      setRating(5);
    } else {
      alert("Error submitting review.");
    }
  };

  const handleRegister = async () => {
    if (selectedMember) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/enroll`,
          {
            listingId,
            memberIds: [selectedMember], // Wrap selectedMember in an array
          }
        );
        if (response.status === 200 || response.status === 201) {
          router.push(`/checkout/${listingId}?memberId=${selectedMember}`);
        }
      } catch (e) {
        console.error("Error during enrollment:", e);
        // Optionally set an error message state here to show to the user
      }
    }
  };

  return (
    <>
      {/* Right Section: Class Details */}
      <div className="bg-blue-50 rounded-lg p-4 max-w-full">
        <div className="w-80 mx-auto p-4">
          <ReplyToListing />
          {/* Dropdown for selecting registered members */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Member:</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            >
              <option value="">N/A</option>
              {members
                .filter((member: any) => {
                  if (member.age >= minAgeLimit && member.age <= maxAgeLimit) {
                    return member;
                  }
                })
                .map((member: any) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Register Now Button */}
          <button
            onClick={handleRegister}
            disabled={!selectedMember} // Button is disabled if no member is selected
            className={`w-full p-2 mb-5 text-white rounded ${
              selectedMember
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Register Now
          </button>
          {trainerPhone && (
            <div className="bg-white w-full p-2 mb-5 rounded flex justify-center items-center">
              <div>
                {/* whatsapp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                </svg>

              </div>
              <div>
              <Link href={`https://wa.me/${trainerPhone}`}>Chat on Whatsapp</Link>
              </div>
            </div>
          )}
          {/* Pop-Up Card */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                <h2 className="text-xl font-bold mb-4">Send a Feedback</h2>
                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  rows={8}
                  placeholder="Type your message here..."
                  required
                ></textarea>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 && "s"}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end">
                  <button
                    onClick={closePopup}
                    className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#17A8FC] hover:bg-blue-500 text-white rounded-md"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Review and Report Section */}
          <div className="bg-white rounded-md shadow p-4 text-center mb-4">
            <p onClick={openPopup} className="text-gray-600 hover:underline">
              <span className="inline-block mr-2">⭐</span> Write a Review
            </p>
            <p className="text-gray-600 mt-2 hover:underline">
              <span className="inline-block mr-2 ">🚩</span> Report Listing
            </p>
          </div>

          {/* Map Section */}
          <MapWidget />
        </div>
      </div>
    </>
  );
}

export default SideLayout;
