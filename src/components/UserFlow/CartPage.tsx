"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      `${process.env.NEXT_PUBLIC_BASE_URL}/listing/listing/${listingId}`
    );
    return { listingId, ...response.data.listing };
  };

  const fetchMemberDetails = async (
    memberId: string
  ): Promise<MemberDetails> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/members/${memberId}`,
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
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 mx-auto p-6 max-w-6xl">
      {/* Product Details Section */}
      <div className="w-full lg:w-2/3 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold p-4 border-b">My Cart</h2>
        {cartItems.map((item, index) => {
          const listing = listingDetails[item.listingId];
          const member = memberDetails[item.memberId];

          return listing && member ? (
            <div
              key={index}
              className="flex items-start gap-4 p-6 border-b last:border-none"
            >
              <Image
                src={'/img/p1.svg'} // Placeholder for now
                alt={listing.title}
                height={32}
                width={32}
                className="w-32 h-32 p-2 object-cover border rounded-md"
              />
              <div className="flex-1 ">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <p className="text-gray-600">Size: {listing.classSize}</p>
                <p className="hidden lg:block text-gray-600">Item No: {listing.listingId}</p>
                <p className="text-sm font-semibold text-orange-700 mt-2">
                  NOW ${listing.price}{" "}
                  <span className="line-through  text-gray-400">
                    WAS ${listing.price}
                  </span>
                </p>
                
                <div className="flex gap-4 mt-4">
                  
                  <button
                    className="px-4 py-2 text-sm border rounded-md text-red-500 hover:bg-red-50"
                    onClick={() => handleDeleteItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {/* <div className="flex flex-col items-center">
                <div className="flex items-center border rounded-md">
                  <button className="px-3 py-1">−</button>
                  <span className="px-3 py-1 border-l border-r">{listing.quantity}</span>
                  <button className="px-3 py-1">+</button>
                </div>
                <p className="text-gray-600 mt-2">${listing.price}</p>
              </div> */}
            </div>
          ) : (
            <p key={index}>Loading...</p>
          );
        })}
      </div>

      {/* Price Details Section */}
      <div className="w-full lg:w-1/3 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold p-4 border-b">Price Details</h2>
        
        <div className="p-4 space-y-4">
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
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${cost.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
