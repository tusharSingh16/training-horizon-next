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
  ageGroup: string;
  description: string;
  trainerId: string;
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
  ageGroup,
  description,
  trainerId,
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
        ageGroup,
        description,
        trainerId,
      })
    );
  };

  return (
    <div
      className="flex-col max-sm:w-10/12 mx-4 rounded-lg overflow-hidden hover:scale-105 shadow-sm w-full h-[22rem] ring-1 ring-gray-100 "
      onClick={() => {
        sendData();
        router.push("/courses/ListingDetail");
      }}
    >
      <div className=" rounded-b-lg bg-white px-2">
        <div className="flex px-4 py-4 justify-center items-center">
          <img
            src={"/img/cricket.png"}
            alt={title}
            className="h-32 w-24 object-contain"
          />
        </div>

        <div>
          <div className="flex">
            <div className="flex flex-grow flexEnd justify-end items-center">
              <img
                src={`${
                  isSelecetd ? `/icons/filled_fav.png` : `/icons/fav.png`
                }`}
                alt="fav"
                className="cursor-pointer"
                onClick={handleOnClick}
              />
            </div>
          </div>
          <h3 className="text-lg m-2 p-2 font-semibold flex justify-center items-center">
            {title}
          </h3>
          <p className="text-sm m-2 p-2 text-gray-500 flex justify-center items-center font-thin">
            Start Date: {startDate} <br />
            {/* end:{endDate} */}
          </p>
          <p className="text-xs text-gray-700 py-3">
            {
              // description
            }
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center py-4">
        <button className=" text-white rounded">
          {category == "Sports" ? "Play" : "Learn"} {title} Now
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
