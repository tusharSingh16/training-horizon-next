"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setForm } from "@/lib/store/formSlice";
import Image from "next/image";

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
  categoryName: string;
  subCategoryName: string;
  avgRating: number;
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
  categoryName,
  subCategoryName,
  avgRating,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(isFavorite);
  const [favorites, setFavorites] = useState<string[]>([]);
  const dispatch = useDispatch();
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
        isFavorite,
      })
    );
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = window.localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const { favorites } = await response.json();
          setFavorites(favorites);
          setIsSelected(favorites.includes(listingId));
        } else {
          console.error("Error fetching user favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [listingId]);

  const handleOnClick = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);

    const userId = window.localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to use this feature");
      router.push("/userflow/login");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites`, {
        method: newIsSelected ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, listingId }),
      });

      if (response.ok) {
        if (newIsSelected) {
          setFavorites((prevFavorites) => [...prevFavorites, listingId]);
        } else {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((id) => id !== listingId)
          );
        }
      } else {
        setIsSelected(!newIsSelected);
        console.error("Error processing favorite");
      }
    } catch (error) {
      setIsSelected(!newIsSelected);
      console.error("Error processing favorite:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-md mx-auto">
      <div
        className="relative cursor-pointer"
        onClick={() => {
          sendData();
          router.push(`/${categoryName}/${subCategoryName}/${listingId}`);
        }}
      >
        <Image
          src="/img/tempListingImg.jpg"
          alt={title}
          className="rounded-t-lg object-cover w-full h-48 sm:h-60"
          width={500}
          height={300}
        />
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
          <Image
            src={`${isSelected ? "/icons/filled_fav.png" : "/icons/fav.png"}`}
            alt="fav"
            width={25}
            height={25}
            onClick={handleOnClick}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          Starting: {startDate}
        </p>
        <p className="text-sm text-gray-500 truncate">Gender: {gender}</p>
        <p className="text-sm text-gray-500 truncate">{days}</p>
        <p className="text-sm text-gray-500 truncate">
          Age: {minAge}-{maxAge}
        </p>
        <p className="text-sm text-yellow-500 font-semibold">
          Rating: {avgRating} ★
        </p>
      </div>
      <div className="flex justify-between items-center mt-2 border-t pt-3">
        <div className="text-lg font-bold">
          $ {price}
          <span className="text-sm font-normal text-gray-400">
            {priceMode === "Per day"
              ? "/day"
              : priceMode === "Per month"
              ? "/month"
              : "/course"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
