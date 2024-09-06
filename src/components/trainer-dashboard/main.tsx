"use client";

import { TrainerForm } from "@/components/trainer-dashboard/form";
import React, { useState } from "react";
import { OrganizationForm } from "./ui/organizationForm";

const main = () => {
  const [role, setRole] = useState<"trainer" | "organization">("trainer");
  console.log(role);
  return (
    <div className="flex relative justify-center h-screen w-full">
      <div className="w-full absolute h-2/5 z-0 bg-[#0E3750]"></div>
      <div className="flex-col absolute top-[10%] w-4/5 ">
        <div className="flex">
          <div className="text-white max-sm:text-xs py-2 font-bold text-xl">
            Submit your details to get verified
          </div>
          <div className="flex justify-center space-x-4 mb-6 ml-5">
            <button
              onClick={() => setRole("trainer")}
              className={`px-4 rounded ${
                role === "trainer" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Sign up as a Trainer
            </button>
            <button
              onClick={() => setRole("organization")}
              className={`py-2 px-4 rounded ${
                role === "organization"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Sign up as a Organization
            </button>
          </div>
        </div>

        <div className="flex  w-full  rounded bg-white ring-1 ring-gray-200 z-10 py-10 px-10 gap-4  ">
          <div className="px-2 w-full ">
            <h1 className="font-bold text-2xl pb-2">Become Instructors</h1>
            {role === "trainer" ? (
              <TrainerForm />
            ) : (
              <OrganizationForm/>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default main;
