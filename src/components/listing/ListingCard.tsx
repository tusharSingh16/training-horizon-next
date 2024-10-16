"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pill from "@/components/listing/Pill";

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
    listingId: string;
    isFavorite: boolean; // Initial favorite state
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
    listingId,
    isFavorite,
}) => {
    const [isSelected, setIsSelected] = useState<boolean>(isFavorite);
    const [favorites, setFavorites] = useState<string[]>([]);
    const router = useRouter();

    // Fetch the user's favorites from the backend when the component mounts
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
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
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
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
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
        <div
            className="flex-col max-sm:w-10/12 mx-4 rounded-2xl overflow-hidden hover:shadow-2xl shadow-lg bg-sky-400 w-full h-[22rem]"
            onClick={() => router.push("/courses/ListingDetail")}
        >
            <div className="rounded-b-2xl bg-white px-2">
                <div className="flex px-4 py-4">
                    <img src={"/img/cricket.png"} alt={title} className="h-32 w-24 object-contain" />
                    <div className="flex w-full justify-end items-start">
                        <Pill text={startTime} color="bg-sky-400" icon="/icons/clock.png" />
                    </div>
                </div>

                <div>
                    <div className="flex">
                        <Pill text={gender} color="bg-sky-400" icon="/icons/person.png" />
                        <div className="flex flex-grow flexEnd justify-end mx-5 items-center">
                            <img
                                src={isSelected ? `/icons/filled_fav.png` : `/icons/fav.png`}
                                alt="fav"
                                className="cursor-pointer"
                                onClick={handleOnClick}
                            />
                        </div>
                    </div>
                    <h3 className="text-xl pt-1 font-semibold">{title}</h3>
                    <p className="text-xs text-gray-500 font-semibold">
                        start: {startDate} <br />
                    </p>
                    
                    <p className="text-xs text-gray-700 py-3">{}</p>
                </div>
            </div>
            
            <div className="flex justify-center items-center py-4">
                <button className="text-white rounded">
                    {category === "Sports" ? "Play" : "Learn"} {title} Now
                </button>
            </div>
        </div>
    );
};

export default ListingCard;
