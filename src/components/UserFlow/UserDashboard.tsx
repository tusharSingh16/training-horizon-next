"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartIcon from "@/app/icons/CartIcon";

const UserDashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  // const [orgName, setOrgName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isOrg, setIsOrg] = useState(false);
  const router = useRouter();
  const userId = window.localStorage.getItem("userId");

  // Fetch user name on component mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsOrg(role == "organization");
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/username`,
          {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          }
        );
        setUserName(response.data.user);
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };

    fetchUserName();
  }, []);
  // /organizations/:id
  const orgId = window.localStorage.getItem("userId");
  // for fetching username for org
  useEffect(() => {
    const fetchOrgName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/organizations/${orgId}`
        );
        setUserName(response.data.orgname);
        // console.log("Org data is " + JSON.stringify(response.data.orgname));
      } catch (error) {
        console.log("Error finding OrgId");
      }
    };
    fetchOrgName();
  },[orgId]);
  
  // Update cartItems when localStorage cart is changed
  useEffect(() => {
    const updateCartItems = () => {
      const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cartData.length);
    };

    // Listen for the custom event
    const handleCartUpdated = () => {
      updateCartItems();
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    // Initial cart items count
    updateCartItems();

    // Cleanup event listener
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  const goToFavorites = () => {
    router.push("/favorites");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    window.location.reload();
    router.push("/");
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <>
      <div className="relative inline-block text-left">
        {/* User Icon and Name */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleDropdownToggle}
        >
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8z" />
            </svg>
          </div>
          <span className="text-yellow-500">{userName || "Loading..."}</span>
          <svg
            className="w-4 h-[4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {/* when other than org */}
        {isDropdownOpen && !isOrg &&(
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={goToFavorites}
              >
                Favorites
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <Link href={`/userflow/orders/${userId}`}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Orders
                </li>
              </Link>
              <Link href="/userflow/familyMembers">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Family Members
                </li>
              </Link>
              <Link href={`/trainer/show_my_listings/${userId}`}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Listings
                </li>
              </Link>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}
        {/* when it is an organziation */}
          {isDropdownOpen && isOrg &&(
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <Link href={`/trainer/show_my_listings/${userId}`}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Listings
                </li>
              </Link>
              <Link href={""}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Create a Gym
                </li>
              </Link>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
      <Link href="/userflow/cart">
        <CartIcon count={cartItems} />
      </Link>
    </>
  );
};

export default UserDashboard;
