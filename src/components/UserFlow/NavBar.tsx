"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserDashboard from "./UserDashboard";
import RoleBasedNav from "./RoleBasedNav";
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsTrainer(role === "trainer");
    setLoggedIn(!!token);
    setLoading(false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    window.location.reload();
    router.push("/");
  };


  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all/courses", label: "Courses" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/trainer", label: "Our Trainers" },
  ];

  return (
    <div className="flex justify-center">
    <nav className="bg-opacity-50 backdrop-blur-md fixed top-3 w-full max-w-screen-xl rounded-xl z-50 shadow-md">

      <div className="container mx-auto p-5">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex space-x-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-black px-3 py-2 rounded-sm text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {loggedIn ? (
              <>
                {isTrainer && !loading && <RoleBasedNav />}
                {!isTrainer && (
                  <Link
                    href="/dashboard/teacher/join_as_teacher"
                    className="bg-yellow-300 text-black px-3 py-2 rounded-sm text-sm font-medium hover:bg-yellow-200"
                  >
                    Join as Trainer
                  </Link>
                )}
                {!isTrainer && (
                  <Link
                    href="/userflow/registerMember"
                    className="text-gray-700 hover:text-black px-3 py-2 rounded-sm text-sm font-medium"
                  >
                    Register Member
                  </Link>
                )}
                <UserDashboard />
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/teacher/join_as_teacher"
                  className="bg-yellow-500 text-black px-3 py-2 rounded-sm text-sm font-medium hover:bg-yellow-200"
                >
                  Join as Trainer
                </Link>
                <Link
                  href="/userflow/login"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-sm text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/userflow/signup"
                  className="bg-yellow-500 text-black px-3 py-2 rounded-sm text-sm font-medium hover:bg-yellow-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-700 hover:text-black focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {navLinks.map(({ href, label }) => (
                <DropdownMenuItem key={href}>
                  <Link
                    href={href}
                    className="block w-full text-gray-700 hover:text-black px-2 py-1 text-sm"
                  >
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {loggedIn ? (
                <>
                  <DropdownMenuItem>
                    <Link
                      href="/userflow/registerMember"
                      className="block w-full text-gray-700 hover:text-black px-2 py-1 text-sm"
                    >
                      Register Member
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserDashboard />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleSignOut}>Sign Out</li>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link
                      href="/userflow/login"
                      className="block w-full text-gray-700 hover:text-black px-2 py-1 text-sm"
                    >
                      Log in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/userflow/signup"
                      className="block w-full text-gray-700 hover:text-black px-2 py-1 text-sm"
                    >
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
