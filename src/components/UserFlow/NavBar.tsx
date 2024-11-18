"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserDashboard from "./UserDashboard";
import RoleBasedNav from "./RoleBasedNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTrainer, setIsTrainer] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("inside the useEffect");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role == "trainer") {
      setIsTrainer(true);
    } else {
      setIsTrainer(false);
    }
    setLoggedIn(!!token);
    setLoading(false);
  }, []);



  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/trainer", label: "Our Trainers" },
  ];

  const renderNavLinks = (isMobile = false) =>
    navLinks.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={`text-gray-700 hover:text-black ${
          isMobile ? "block" : ""
        } px-3 py-2 rounded-md text-sm font-medium`}
      >
        {label}
      </Link>
    ));


  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto p-5">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex space-x-4">{renderNavLinks()}</div>
          <div className="flex items-center space-x-4">
            {loggedIn ? (
              <>
                {(isTrainer && !loading) ? <RoleBasedNav /> : null}
                {!isTrainer && (
                  <Link
                    href="/dashboard/teacher/join_as_teacher"
                    className="bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow-200"
                  >
                    Join as Trainer
                  </Link>
                )}

                {!isTrainer && <Link
                  href="/userflow/registerMember"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register Member
                </Link>}

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
            {renderNavLinks(true)}
            {loggedIn ? (
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
                <UserDashboard />
              </>
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
