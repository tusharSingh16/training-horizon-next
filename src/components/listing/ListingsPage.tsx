"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSideBar";
import ListingCard from "./ListingCard";
import axios from 'axios';

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
  listingId: string;
  isFavorite: boolean;
}

const ListingsPage: React.FC<{categoryName:string ,subCategoryName:string}> = ({categoryName,subCategoryName}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);

  const [isFilterOpen, setFilterOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [RateRange, setRateRange] = useState<[number, number]>([10, 9980]);
  const [ageLimit, setAgeLimit] = useState<[number, number]>([2, 90]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [get, set] = useState<boolean>(false);

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
  // console.log("Listings are: "= );
  
  useEffect(() => {
    const fetchCourses = async () => {
      const query = new URLSearchParams({
        title: keywords || '', 
        category: selectedCategory || '', 
        selectedSubCategory: selectedSubCategory || '', 
        minPrice: RateRange[0].toString(), 
        maxPrice: RateRange[1].toString(),
        minAge: ageLimit[0].toString(),
        maxAge: ageLimit[1].toString(),
        gender: selectedGender || '', 
      }).toString();
      
      console.log("Fetching courses with query:", query);
      
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/listing/?${query}`
        );
        console.log("Fetched data:", data);
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
  
    fetchCourses();
  }, [get, keywords, selectedCategory, selectedSubCategory, RateRange, ageLimit, selectedGender]);
  

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
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              RateRange={RateRange}
              setRateRange={setRateRange}
              ageLimit={ageLimit}
              setAgeLimit={setAgeLimit}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              get ={get}
              set ={set}
            />
          </aside>

          <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length > 0 ? (
              listings.map((listing, idx) => (
                // <ListingCard key={idx} {...listing} />
                <ListingCard
                subCategoryName={subCategoryName}
                categoryName={categoryName}
                key={idx}
                listingId={listing._id} // Make sure listing._id is passed here
                category={listing.category}
                title={listing.title}
                priceMode={listing.priceMode}
                price={listing.price}
                mode={listing.mode}
                location={listing.location} trainerId={listing.trainerId} quantity={listing.quantity} classSize={listing.classSize} startDate={listing.startDate} endDate={listing.endDate} days={listing.days} gender={listing.gender} startTime={listing.startTime} endTime={listing.endTime} minAge={listing.minAge} maxAge={listing.maxAge} description={listing.description} isFavorite={false}/>
              ))
            ) : (
              <p>No listings fossund.</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
