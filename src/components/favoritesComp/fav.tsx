"use client"; // This marks the component as a Client Component

import axios from 'axios';
import { useState, useEffect } from 'react';
import ListingCard from '../listing/ListingCard';

interface Listing {
    _id: string;
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
    isfavorite:boolean;
}

const FavoriteListingIds = () => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [listingDetails, setListingDetails] = useState<Listing[]>([]); // State to store listing details

    useEffect(() => {
        const fetchFavoriteIds = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = window.localStorage.getItem('userId');
                
                const response = await axios.get(`http://localhost:3005/api/v1/favorites/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setFavoriteIds(response.data.favorites); // Assuming this returns an array of listing IDs
            } catch (error) {
                console.error('Error fetching favorite listing IDs:', error);
            }
        };

        fetchFavoriteIds();
    }, []);

    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                const detailsPromises = favoriteIds.map(id =>
                    axios.get(`http://localhost:3005/api/v1/listing/listing/${id}`) // Fetch details for each listing ID
                );

                const results = await Promise.all(detailsPromises);
                const listings = results.map(result => result.data.listing); // Adjust based on your API response structure
                setListingDetails(listings); // Store fetched listing details
                console.log(listings)
            } catch (error) {
                console.error('Error fetching listing details:', error);
            }
        };

        if (favoriteIds.length > 0) {
            fetchListingDetails();
        }
    }, [favoriteIds]); // Trigger this effect when favoriteIds change

    return (
        <div>
            <div className="text-center m-9 font-bold">Your Favorite Listings</div>
            
            <ul>
            <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {listingDetails.length > 0 ? (
                    listingDetails.map(listing => (
                        <ListingCard
                        key={listing._id}
                        listingId={listing._id}
                        category={listing.category}
                        title={listing.title}
                        priceMode={listing.priceMode}
                        price={listing.price}
                        mode={listing.mode}
                        trainerId={listing.trainerId}
                        location={listing.location}
                        quantity={listing.quantity}
                        classSize={listing.classSize}
                        startDate={listing.startDate}
                        endDate={listing.endDate}
                        days={listing.days}
                        gender={listing.gender}
                        startTime={listing.startTime}
                        endTime={listing.endTime}
                        ageGroup={listing.ageGroup}
                        description={""}
                        isFavorite={true} // Indicate that this listing is a favorite
                    />
                    
                    ))
                ) : (
                    <div className=" text-center font-medium block grid-col">No listings found.</div>
                )}
                </main>
            </ul>
        </div>
    );
};

export default FavoriteListingIds;
