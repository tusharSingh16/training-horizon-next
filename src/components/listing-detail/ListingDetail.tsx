import React, { useEffect, useState } from "react";
import SideLayout from "./SideLayout";
import MainDetailPage from "./MainDetailPage";
import InstructorsPage from "../UserFlow/Instructor";
import Reviews from "./Reviews";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useId } from "react";
interface TrainerData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  experience: string;
  qualifications: string;
  phone: string;
  avgRating: number;
  [key: string]: any; 
}

interface ListingDetailPageProps {
  id: string; 
}

interface ListingCard {
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
  minAge: string;
  maxAge: string;
  description: string;
  trainerId: string;
  listingId: string;
  isFavorite: boolean;
}

const ListingDetail: React.FC<ListingDetailPageProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [data, setData] = useState<TrainerData | null>(null);
  const [getListing, setListing] = useState<ListingCard>({} as ListingCard); 
  const form = useSelector((state: RootState) => state.form);
  // Fetch listing details
  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/listing/listing/${id}`
        );
        setListing(response.data.listing);
      } catch (error) {
        console.log("Error fetching listing data:", error);
      }
    };
  
    fetchListingData();
  }, [id]);

    // console.log(check)
  // Fetch trainer details if trainerId is available
  useEffect(() => {
    if (form.trainerId) {
      const fetchTrainerData = async () => {
        try {
          console.log("use effect called");
          
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/${form.trainerId}`
          );
          setData(response.data.trainer);
        } catch (error) {
          console.log("Error fetching trainer data:", error);
        }
      };

      fetchTrainerData();
    }
  }, [form.trainerId])

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center ">
        <MainDetailPage listingId={id} listingData={getListing} />
        <SideLayout 
          minAgeLimit={Number(form.minAge)} 
          maxAgeLimit={Number(form.maxAge)} 
          listingId={id} 
          trainerPhone={data?.phone ?? ''}
        />
      </div>
      <Reviews listingId={id}/>
      {/* <GoogleMapComponent apiKey={googleMapsApiKey} /> */}
      {data && <InstructorsPage trainer={data} />}
    </>
  );
};

export default ListingDetail;
