"use client";

import React, { useState } from "react";
import Link from "next/link";
import UserDashboard from "./UserDashboard";
import RoleBasedNav from "./RoleBasedNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if the user is logged in by verifying the existence of a token in localStorage
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const isUserTrainer = () => {
    const userRole = localStorage.getItem("role");
    return userRole === "trainer";
  };
  const loggedIn = isUserLoggedIn();
  const isTrainer = isUserTrainer();

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto p-5">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/trainer"
              className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              Our Trainers
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/teacher/join_as_teacher"
              className="bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow-200"
            >
              Join as Trainer
            </Link>
            {loggedIn ? (
              <>
                <RoleBasedNav />
                {/* {!isTrainer && (
                  <Link
                    href="/dashboard/teacher/join_as_teacher"
                    className="bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow-200"
                  >
                    Join as Trainer
                  </Link>
                )} */}
                {
                  <Link
                    href="/userflow/addListing"
                    className="bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
                  >
                    Add Listing
                  </Link>
                }
                {!isTrainer && (
                  <Link
                    href="/userflow/registerMember"
                    className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register Member
                  </Link>
                )}
                <UserDashboard />
              </>
            ) : (
              <>
                <Link
                  href="/userflow/login"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/userflow/signup"
                  className="bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-black focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>

        {/* Mobile Navbar */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            <Link
              href="/trainers"
              className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
            >
              Our Trainers
            </Link>
            {loggedIn && (
              <>
                <Link
                  href="/userflow/addListing"
                  className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Add Listing
                </Link>
                <Link
                  href="/userflow/registerMember"
                  className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register Member
                </Link>
              </>
            )}
            {loggedIn ? (
              <UserDashboard />
            ) : (
              <>
                <Link
                  href="/userflow/login"
                  className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/userflow/signup"
                  className="bg-yellow-500 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
