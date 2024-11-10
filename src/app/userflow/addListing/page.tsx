import Navbar from "@/components/UserFlow/NavBar";
import { AddListing } from "@/components/UserFlow/AddListing";
import React, { Suspense } from "react";

const listingPage = () => {
  return (
    <>
      <Navbar />
      <Suspense>
        <AddListing />
      </Suspense>
    </>
  );
};

export default listingPage;
