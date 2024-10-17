// pages/orders.tsx
"use client";
import Footer from "@/components/UserFlow/Footer";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/UserFlow/NavBar";
import Link from "next/link";
import ListingCard from "@/components/listing/ListingCard"

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

interface Orders {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  totalPrice: string;
}


 

type Order = {
  _id: number;
  createdAt: string;
  status: "ON HOLD" | "FAILED" | "COMPLETED";
  coursePrice: string;
  items: number;
};

const MyOrders: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch("http://localhost:3005/api/v1/listing/listing/")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchOrders = async (id: string) => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/order/getOrdersByUserId/" +
            id.toString()
        );
        console.log(id);
        setOrders(response.data.orders); // Assuming the API returns orders in `response.data.orders`
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(id);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };
  return (
    <>
      <Navbar />
      <div className=" p-3 m-3">
        <div className="w-full text-center text-3xl my-4 font-bold text-gray-700">
          MY ORDERS
        </div>
        <hr className="w=full border-2 border-sky-500" />
        <div className="container h-[31rem]  mx-auto p-6">
          <table className="min-w-full table-auto border-slate">
            <thead >
              <tr className="bg-slate-200 text-left">
                <th className="py-2 px-4">Order Id</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`${
                        order.status === "ON HOLD"
                          ? `text-yellow-600 bg-yellow-100`
                          : `${
                              order.status === "FAILED"
                                ? `bg-red-500 text-white`
                                : `bg-green-500 text-white`
                            } `
                      } py-1 px-3 rounded-full text-sm`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">${order.coursePrice}</td>
                  <td className="py-2 px-4">
                    <Link
                      className="text-blue-600"
                      href={`/userflow/orderdetails/${order._id}`}
                    >
                      {" "}
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="my-4  m-8 text-2xl">Explore more</div>
        <div className="m-4" style={{ overflowX: "scroll" }}>
          <div style={{ display: "flex" }}>
            {listings.length > 0 ? (
              listings.slice(0,15).map((listing, idx) => (
                <div
                  key={idx}
                  style={{
                    minWidth: "250px", 
                    height: "400px",
                    margin: "0 10px",
                    padding: "4px",
                    marginBottom: "4px",
                    backgroundColor: "#00000",
                    borderRadius: "1px",
                    textAlign: "center",
                  }}
                >
                  <ListingCard minAge={""} maxAge={""} key={idx} {...listing} />
                </div>
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        </div>
      <Footer />
    </>
  );
};

export default MyOrders;
