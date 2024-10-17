"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Pill from "@/components/listing/Pill";
import { useDispatch } from "react-redux";
import { setForm } from "@/lib/store/formSlice";

interface ListingCardProps {
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

const ListingCard: React.FC<ListingCardProps> = ({
  category,
  title,
  priceMode,
  price,
  mode,
  location,
  quantity,
  classSize,
  startDate,
  endDate,
  days,
  gender,
  startTime,
  endTime,
  minAge,
  maxAge,
  description,
  trainerId,
  listingId,
  isFavorite,
}) => {
  const [isSelecetd, setIsSeleceted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    setIsSeleceted(!isSelecetd);
  };
  const router = useRouter();

  const sendData = () => {
    dispatch(
      setForm({
        category,
        title,
        priceMode,
        price,
        mode,
        location,
        quantity,
        classSize,
        startDate,
        endDate,
        days,
        gender,
        startTime,
        endTime,
        minAge,
        maxAge,
        description,
        trainerId,
      })
    );
  };

  return (
    <div className="flex-col max-sm:w-10/12 rounded-sm overflow-hidden hover:ring-sky-500 hover:scale-105 ring-1 ring-gray-200 shadow-3xl bg-white w-full h-[24rem]">
      <div className="h-5/6 cursor-pointer" onClick={() => {
                sendData();
                router.push("/courses/ListingDetail");
              }}>
        <div className="h-1/2 w-full">
          <img
            src={"/img/tempListingImg.jpg"}
            alt={title}
            className="w-full object-cover h-full"
          />
        </div>
        <div className="h-1/2">
          <div className="bg-white h-4/5 p-3 w-full ">
            <h3 className="text-xl font-semibold truncate overflow-hidden whitespace-nowrap">{title}</h3>
            <p className="text-sm text-gray-500">Starting: {startDate}</p>
            <p className="text-xs text-gray-500">{gender}</p>
            <p className="text-xs text-gray-500">{days}</p>
            <p className="text-xs text-gray-500">Age: {minAge}-{maxAge}</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white h-1/6 ring-1 ring-gray-200 flex flex-row justify-between p-3">
        <div className="w-5/6 flex items-center justify-start">
          <div className="text-xl">$ {price}.00 <span className="text-gray-400 text-xs">{priceMode === "Per day" ? "/day" : priceMode === "Per month" ? "/month" : "/course"}</span></div>
        </div>
        <div className="h-full flex items-center justify-center w-1/6">
          <img
            src={`${isSelecetd ? `/icons/filled_fav.png` : `/icons/fav.png`}`}
            alt="fav"
            className="cursor-pointer"
            onClick={handleOnClick}
          />
        </div>
      </div>

    </div>
  );
};

export default ListingCard;
