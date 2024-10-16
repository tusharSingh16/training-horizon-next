"use client";
import React, { useState, useEffect } from "react";
import ListingCard from "../listing/ListingCard";

interface Listing {
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
  days: string;
  gender: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  description: string;
  trainerId: string;
}

interface Orders{
    fname: string;
    lname: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
    totalPrice: string;
}

function OrderDetails() {
  const [listings, setListings] = useState<Listing[]>([]);
    const [orders,setOrders] = useState<Orders[]>([]);
  useEffect(() => {
    fetch("http://localhost:3005/api/v1/listing/listing/")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

 

  return (
    <>
      <div className="h-full w-full">
        <div className="bg-slate-300 p-3 m-3">
        <div className="my-4  m-8 text-2xl flex flex-col text-center font-bold">
          ORDERS
        </div>
        <p className="flex flex-col text-center">
          Here the orders details will be shown when the user is able to order
          for the course <br />
          which will be fetch from the DB
        </p>
        </div>

        {/*listings*/}
        <div className="my-4  m-8 text-2xl">Explore more</div>
        <div className="m-4" style={{ overflowX: "scroll" }}>
          <div style={{ display: "flex" }}>
            {listings.length > 0 ? (
              listings.map((listing, idx) => (
                <div
                  key={idx}
                  style={{
                    minWidth: "250px", // Make sure items have a width to scroll
                    margin: "0 10px",
                    padding: "4px",
                    marginBottom: "4px",
                    backgroundColor: "#00000",
                    borderRadius: "1px",
                    textAlign: "center",
                  }}
                >
                  <ListingCard key={idx} {...listing} />
                </div>
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
