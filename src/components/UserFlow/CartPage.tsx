"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type CartItem = {
  memberId: string;
  listingId: string;
};

type ListingDetails = {
  listingId: string;
  trainerId: string;
  category: string;
  title: string;
  priceMode: string;
  price: string;
  mode: string;
  location: string;
  quantity: string;
  classSize: string;
  startDate: string;
  endDate: string;
  days: string[];
  gender: string;
  startTime: string;
  endTime: string;
  minAge: string;
  maxAge: string;
  preRequistes: string;
  description: string;
  isApproved: boolean;
};

type MemberDetails = {
  memberId: string;
  name: string;
  age: number;
  relationship: string;
  gender: string;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [listingDetails, setListingDetails] = useState<
    Record<string, ListingDetails>
  >({});
  const [memberDetails, setMemberDetails] = useState<
    Record<string, MemberDetails>
  >({});
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.length);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const fetchDetails = async () => {
        const uniqueListingIds = Array.from(
          new Set(cartItems.map((item) => item.listingId))
        );
        const uniqueMemberIds = Array.from(
          new Set(cartItems.map((item) => item.memberId))
        );

        const listingData = await Promise.all(
          uniqueListingIds.map((id) => fetchListingDetails(id))
        );
        const memberData = await Promise.all(
          uniqueMemberIds.map((id) => fetchMemberDetails(id))
        );

        setListingDetails(
          Object.fromEntries(
            listingData.map((detail) => [detail.listingId, detail])
          )
        );
        setMemberDetails(
          Object.fromEntries(
            memberData.map((member) => [member.memberId, member])
          )
        );
      };

      fetchDetails();
    }
  }, [cartItems]);

  const fetchListingDetails = async (
    listingId: string
  ): Promise<ListingDetails> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/listing/listing/${listingId}`
    );
    return { listingId, ...response.data.listing };
  };

  const fetchMemberDetails = async (
    memberId: string
  ): Promise<MemberDetails> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/members/${memberId}`,
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );
    return { memberId, ...response.data.member };
  };

  const handleDeleteItem = (itemToDelete: CartItem) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.memberId === itemToDelete.memberId &&
          item.listingId === itemToDelete.listingId
        )
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setCartCount(updatedCart.length);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const listing = listingDetails[item.listingId];
    return sum + (listing ? parseFloat(listing.price) : 0);
  }, 0);

  const tax = subtotal * 0.18;
  const cost = 10;
  const total = subtotal + tax + cost;

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Your cart is empty. Add items to proceed to checkout.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 mx-auto p-4 max-w-5xl">
      {/* Cart Details Section */}
      <div className="w-full lg:w-2/3 max-w-lg border rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Cart Details</h2>
        <div className="space-y-4">
          {cartItems.map((item, index) => {
            const listing = listingDetails[item.listingId];
            const member = memberDetails[item.memberId];

            return (
              <div key={index} className="border-b pb-4">
                {listing && member ? (
                  <>
                    <p className="text-gray-600">Category: {listing.category}</p>
                    <p className="text-gray-600">Price Mode: {listing.priceMode}</p>
                    <p className="text-gray-600">Mode: {listing.mode}</p>
                    <p className="text-gray-600">Location: {listing.location}</p>
                    <p className="text-gray-600">Class Size: {listing.classSize}</p>
                    <p className="text-gray-600">Start Date: {listing.startDate}</p>
                    <p className="text-gray-600">End Date: {listing.endDate}</p>
                    <p className="text-gray-600">Days: {listing.days.join(", ")}</p>
                    <p className="text-gray-600">Gender: {listing.gender}</p>
                    <p className="text-gray-600">Time: {listing.startTime} - {listing.endTime}</p>
                    <p className="text-gray-600">Age Range: {listing.minAge} - {listing.maxAge}</p>
                    <p className="text-gray-600">Pre-Requisites: {listing.preRequistes}</p>
                    <p className="text-gray-600">Member Age: {member.age}</p>
                    <p className="text-gray-600">Member Relationship: {member.relationship}</p>
                  </>
                ) : (
                  <p>Loading details...</p>
                )}
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Delete Item
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Details Section */}
      <div className="w-full lg:w-1/3 max-w-lg border rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-3">Price Details</h2>
        <div className="border-t border-gray-200">
          {cartItems.map((item, index) => {
            const listing = listingDetails[item.listingId];
            const member = memberDetails[item.memberId];

            return (
              listing && (
                <div key={index} className="flex justify-between py-2">
                  <div>
                    <span className="font-semibold">{listing.title}</span>
                    <br />
                    <span className="text-gray-500">Learner: {member?.name}</span>
                  </div>
                  <span>${listing.price}</span>
                </div>
              )
            );
          })}
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax (18%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Service Cost</span>
            <span>${cost.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-full">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
