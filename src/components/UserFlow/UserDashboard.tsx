"use client";

import CartIcon from "@/app/icons/CartIcon";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserDashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  // const [orgName, setOrgName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isOrg, setIsOrg] = useState(false);
  const router = useRouter();
  const userId =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userId")
      : null;

  // Fetch user role on component mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const role = localStorage.getItem("role");
    setIsOrg(role === "organization");
  }, []);

  // Fetch user name on component mount
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/username`,
          {
            headers: {
              Authorization:
                "Bearer " +
                (typeof window !== "undefined"
                  ? window.localStorage.getItem("token")
                  : ""),
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

  // Organization ID from localStorage
  const orgId =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userId")
      : null;

  // Fetch organization name on component mount
  useEffect(() => {
    const fetchOrgName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/organizations/${orgId}`
        );
        setUserName(response.data.orgname);
      } catch (error) {
        console.log("Error finding OrgId");
      }
    };
    if (isOrg) fetchOrgName();
  }, [isOrg, orgId]);

  // Update cartItems when localStorage cart is changed
  useEffect(() => {
    if (typeof window === "undefined") return;

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
    if (typeof window === "undefined") return;

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
      <div className="relative text-left flex flex-row  items-center space-x-4 ">
        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {userName || "Loading..."}
            </span>
            <img
              src="https://github.com/shadcn.png"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52" >
            {!isOrg ? (
              <>
                <DropdownMenuItem asChild className="py-3">
                  <Link href="/userflow/yourProfile">Your Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-3">
                  <Link href={`/trainer/show_my_listings/${userId}`}>
                    My Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3" onClick={goToFavorites}>
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-3">
                  <Link href={`/userflow/orders/${userId}`}>Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-3">
                  <Link href="/userflow/registerMember">Register Member</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-3">
                  <Link href="/userflow/familyMembers">Family Members</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-3">
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/trainer/show_my_listings/${userId}`}>
                    My Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create-gym">Create a Gym</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Cart Icon */}
        <Link className="relative hidden sm:block" href="/userflow/cart">
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-blue-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </Link>
      </div>
    </>
  );
};

export default UserDashboard;
