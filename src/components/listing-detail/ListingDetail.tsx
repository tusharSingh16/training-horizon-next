"use client";

import React, { useEffect, useState } from "react";
import SideLayout from "./SideLayout";
import MainDetailPage from "./MainDetailPage";
import InstructorsPage from "../UserFlow/Instructor";
import Reviews from "./Reviews";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import axios from "axios";
import GoogleMapComponent from "./GoogleMapComponent";
import MapWidget from "./MapWidget";

interface TrainerData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  experience: string;
  qualifications: string;
  [key: string]: any; // Optional: for additional properties
}

const ListingDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TrainerData | null>(null);
  const tabs = ["Overview", "Instructors", "Curriculum", "Reviews", "FAQs"];

  const form = useSelector((state: RootState) => state.form);
  // console.log(form.trainerId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/trainers/" + form.trainerId.toString()
        );
        // console.log(response.data.trainer);
        setData(response.data.trainer);
        // console.log(data);
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, [form.trainerId]);
  // if (data) console.log(data);
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center ">
        <MainDetailPage />
        <SideLayout />
      </div>
      <Reviews />
      {/* <GoogleMapComponent apiKey={googleMapsApiKey} /> */}
      {data && <InstructorsPage trainer={data} />}
    </>
  );
};

export default ListingDetail;
