"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Overview from "@/components/listing-detail/Overview";
import { useEffect } from "react";
import { useState } from "react"
import { FormProvider } from "react-hook-form";
import { Interface } from "readline";
import router from "next/router";
import Image from "next/image";
interface ChildComponentProps {
  category: string;
  title: string;
  price: number;
  mode: string;
  location: string;
  quantity: number;
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
  isFavorite: boolean;
}
interface ListingId{
  listingId:string ;
}

const MainDetailPage : React.FC<ListingId> = ({ listingId })=>{
  const tabs = ["Overview", "Instructors", "Curriculum", "Reviews", "FAQs"];
  const form = useSelector((state: RootState) => state.form);
  const [isSelected, setIsSelected] = useState<boolean>(form.isFavorite);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = window.localStorage.getItem('userId');
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3005/api/v1/favorites/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${ window.localStorage.getItem('token') }`,
                },
    });

  if (response.ok) {
    const { favorites } = await response.json();
    setFavorites(favorites);
    setIsSelected(favorites.includes(listingId)); // Check if this listing is a favorite
  } else {
    console.error('Error fetching user favorites');
  }
} catch (error) {
  console.error('Error fetching favorites:', error);
}
    };

fetchFavorites();
}, [listingId]);

// Handle favorite button click
const handleOnClick = async (event: React.MouseEvent<HTMLImageElement>) => {
  event.preventDefault();
  event.stopPropagation();

  const newIsSelected = !isSelected;
  setIsSelected(newIsSelected);

  const userId = window.localStorage.getItem('userId');
  if (!userId) {
    alert("Please log in to use this feature");
    router.push("/userflow/login");
    return;
  }

  try {
    const response = await fetch('http://localhost:3005/api/v1/favorites', {
      method: newIsSelected ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ window.localStorage.getItem('token') }`,
            },
  body: JSON.stringify({ userId, listingId }),
        });

if (response.ok) {
  if (newIsSelected) {
    setFavorites((prevFavorites) => [...prevFavorites, listingId]);
    console.log('Favorite added successfully');
  } else {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== listingId));
    console.log('Favorite removed successfully');
  }
} else {
  const errorData = await response.json();
  console.error(newIsSelected ? 'Error adding favorite:' : 'Error removing favorite:', errorData.message);
  setIsSelected(!newIsSelected); // Revert state if API call fails
}
    } catch (error) {
  console.error('Error processing favorite:', error);
  setIsSelected(!newIsSelected); // Revert state if API call fails
}
};

  return (
    <>
      <div>
        <div className="flex">
          {/* Left Section: Image or Icon */}
          <div className="bg-white rounded-md p-4 mb-4">
            <div className="relative h-64 w-full">
              <Image
                className="h-[20rem] w-[55rem]"
                src="/img/math.svg"
                alt="Calculator and Tools"
              />
            </div>
          </div>

          {/* Middle Section: Course Info */}
          <div className="flex-grow">
            <span className="bg-[#17A8FC] text-white p-1.5 rounded-3xl">
              {form.category}
            </span>
            <h2 className="text-2xl font-bold mt-2">{form.title}</h2>
            <p className="text-gray-600 mt-2">{form.description}</p>
            <div className="mt-4 flex space-x-6 text-sm text-gray-600">
              <span>50+ People Enrolled</span>
              <span>5 Projects</span>
              <span>37+ Reviews</span>
            </div>
            <div className="m-8 inline-flex">
              <button className="bg-[#17A8FC] text-white py-3 px-8 rounded mb-8 hover:bg-[#1782fc] shadow-xl">
                Learn {form.category}
              </button>
              <div className=" mt-3 m-3">
              <Image
             src={`${isSelected ? `/icons/filled_fav.png` : `/icons/fav.png`}`}
             alt="fav"
            className="cursor-pointer"
            onClick={handleOnClick}
        />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default MainDetailPage;
