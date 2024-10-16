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
  const [minAge, setMinAge] = useState<number>(0);
  
  useEffect(() => {
    const ListingMinAge = async () => {
      try {
        const res = await axios.get("http://localhost:3005/api/v1/listing/listing/");
        const data = res.data[0];
        console.log(data);
        if (data.length > 0) {
          if(data.ageGroup === "21+")
          setMinAge(21); 
          else if(data.ageGroup === "18+")
          setMinAge(18);
          else if(data.ageGroup === "12+")
          setMinAge(12);
          else if(data.ageGroup === "6+")
          setMinAge(6);
        }
      } catch (e) {
        console.error(e);
      }
    };
    ListingMinAge();
  }, []);
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
  // fetch the listing age limit from the listing
  const ListingAgeLimit = async () => {
    const response = await axios.get(
      "http://localhost:3005/api/v1/listing/listing/"
    );
    console.log(response.data);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center ">
        <MainDetailPage />
        <SideLayout listingAgeLimit={minAge} />
      </div>
      <Reviews />
      {/* <GoogleMapComponent apiKey={googleMapsApiKey} /> */}
      {data && <InstructorsPage trainer={data} />}
    </>
  );
};

export default ListingDetail;
