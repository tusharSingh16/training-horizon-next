"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSideBar";
import ListingCard from "./ListingCard";
import axios from 'axios';

interface Listing {
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
  // ageGroup: string;
  minAge: string;
  maxAge: string;
  description: string;
  trainerId: string;
}

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);

useEffect(()=>  {
  const response =axios.get("http://localhost:3005/api/v1/listing/listing/")
  .then((res)=> {
    setListings(res.data);
  })
  .catch((err)=> {
    console.log(err);
  })
},[])

  const handleSearch = () => {
    const filtered = listings.filter((listing) => {
      const matchesKeywords =
        keywords === "" ||
        listing.title.toLowerCase().includes(keywords.toLowerCase());
      // const matchesLocation = location === '' || listing.location.toLowerCase().includes(location.toLowerCase());
      // return matchesKeywords && matchesLocation;
      return matchesKeywords;
    });

    setFilteredListings(filtered);
  };

  const handleFilter = () => {
    const filtered = listings.filter((listing) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category);
      return matchesCategory;
    });

    setFilteredListings(filtered);
  };
  // console.log(listings[0].trainerId);

  return (
    <>
      <div>{/* <h1>{listings[0].trainerId}</h1> */}</div>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto">
            <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              // location={location}
              // setLocation={setLocation}
              onSearch={handleSearch}
            />
          </div>
        </header>

        <div className="container mx-auto flex flex-1">
          <aside className="w-1/4">
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onFilter={handleFilter}
            />
          </aside>

          <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length > 0 ? (
              listings.map((listing, idx) => (
                <ListingCard key={idx} {...listing} />
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
