"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import React, { useEffect, useState } from "react";
import ReplyToListing from "./ReplyToListing";
import MapWidget from "./MapWidget";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp, FaStar, FaFlag } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface SideLayoutProps {
  minAgeLimit: number;
  maxAgeLimit: number;
  listingId: string;
  trainerPhone: string;
}

const SideLayout: React.FC<SideLayoutProps> = ({
  minAgeLimit,
  maxAgeLimit,
  listingId,
  trainerPhone,
}) => {
  const [name, setName] = useState("user");
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;
      
      try {
        const [userRes, membersRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/username`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/allmembers`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setName(userRes.data.user);
        setMembers(membersRes.data.familyMembers);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleCheckboxChange = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const handleAddToCart = () => {
    if (selectedMembers.length === 0) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    selectedMembers.forEach((memberId) => {
      if (!cart.some((item: { memberId: string; listingId: string }) => item.memberId === memberId && item.listingId === listingId)) {
        cart.push({ memberId, listingId });
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    router.push(`/userflow/cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-full border border-gray-200">
      <ReplyToListing />

      <div className="mb-6">
        <label className="block text-gray-800 font-semibold mb-2">Select Members:</label>
        <p className="text-sm text-gray-500 mb-2">(Only eligible members are shown)</p>
        {members.filter((m) => m.age >= minAgeLimit && m.age <= maxAgeLimit).map((member) => (
          <div key={member._id} className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              id={`member-${member._id}`}
              value={member._id}
              checked={selectedMembers.includes(member._id)}
              onChange={() => handleCheckboxChange(member._id)}
              className="accent-blue-500"
            />
            <label htmlFor={`member-${member._id}`} className="text-gray-700 font-medium">
              {member.name}
            </label>
          </div>
        ))}
      </div>

      <Button onClick={handleAddToCart} disabled={selectedMembers.length === 0} className="w-full">
        Add To Cart
      </Button>

      {trainerPhone && (
        <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center mt-4 cursor-pointer hover:bg-gray-200">
          <FaWhatsapp className="text-green-500 text-2xl mr-2" />
          <Link href={`https://wa.me/${trainerPhone}`} className="text-blue-600 font-semibold">
            Chat on WhatsApp
          </Link>
        </div>
      )}

      <div className="mt-6 bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
        <p onClick={() => setIsOpen(true)} className="text-blue-500 cursor-pointer hover:underline flex items-center justify-center">
          <FaStar className="mr-2" /> Write a Review
        </p>
        <p className="text-red-500 mt-2 cursor-pointer hover:underline flex items-center justify-center">
          <FaFlag className="mr-2" /> Report Listing
        </p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Send a Feedback</h2>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows={4}
              placeholder="Type your message here..."
            ></textarea>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{star} Star{star > 1 && "s"}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={() => {}}>Submit</Button>
            </div>
          </div>
        </div>
      )}

      <MapWidget />
    </div>
  );
};

export default SideLayout;
