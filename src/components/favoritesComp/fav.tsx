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
    minAge: string;
    maxAge: string;
    description: string;
    trainerId: string;
    isfavorite: boolean;
}

const FavoriteListingIds = () => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // Always initialized as an array
    const [listingDetails, setListingDetails] = useState<Listing[]>([]); // State to store listing details

    // Fetch favorite listing IDs
    useEffect(() => {
        const fetchFavoriteIds = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = window.localStorage.getItem('userId');

                const response = await axios.get(`http://localhost:3005/api/v1/favorites/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && Array.isArray(response.data.favorites)) {
                    setFavoriteIds(response.data.favorites); // Ensure it's an array
                } else {
                    setFavoriteIds([]); // Fallback to an empty array if the response is not valid
                }
            } catch (error) {
                console.error('Error fetching favorite listing IDs:', error);
                setFavoriteIds([]); // Fallback to empty array on error
            }
        };
        fetchFavoriteIds();
    }, []);

    // Fetch details for each listing ID
    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                const detailsPromises = favoriteIds.map(id =>
                    axios.get(`http://localhost:3005/api/v1/listing/listing/${id}`) // Fetch details for each listing ID
                );
                const results = await Promise.all(detailsPromises);
                const listings = results.map(result => result.data.listing); // Adjust based on your API response structure
                setListingDetails(listings); // Store fetched listing details
                console.log(listings);
            } catch (error) {
                console.error('Error fetching listing details:', error);
            }
        };

        if (favoriteIds.length > 0) {
            fetchListingDetails(); // Fetch details only if favoriteIds is a non-empty array
        }
    }, [favoriteIds]);

    return (
        <div>
            <div className="text-center m-9 font-bold">Your Favorite Listings</div>
            
            <div>
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
                                minAge={listing.minAge}
                                maxAge={listing.maxAge}
                                description={""}
                                isFavorite={true} // Indicate that this listing is a favorite
                            />
                        ))
                    ) : (
                        <div className="text-center font-medium block grid-col">No listings found.</div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default FavoriteListingIds;
