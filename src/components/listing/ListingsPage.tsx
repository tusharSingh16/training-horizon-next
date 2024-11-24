"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSideBar";
import ListingCard from "./ListingCard";
import axios from "axios";

interface Listing {
  _id: string;
  category: string;
  title: string;
  imageUrl:string;
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
  avgRating: number;
}

const ListingsPage: React.FC<{ categoryName: string; subCategoryName: string }> = ({
  categoryName,
  subCategoryName,
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [isFilterOpen, setFilterOpen] = useState(false); // Sidebar toggle for mobile
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [RateRange, setRateRange] = useState<[number, number]>([10, 9980]);
  const [ageLimit, setAgeLimit] = useState<[number, number]>([2, 90]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [get, set] = useState<boolean>(false);

  const handleSearch = () => {
    const filtered = listings.filter((listing) =>
      keywords === "" || listing.title.toLowerCase().includes(keywords.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const query = new URLSearchParams({
        title: keywords || "",
        category: selectedCategory || "",
        selectedSubCategory: selectedSubCategory || "",
        minPrice: RateRange[0].toString(),
        maxPrice: RateRange[1].toString(),
        minAge: ageLimit[0].toString(),
        maxAge: ageLimit[1].toString(),
        gender: selectedGender || "",
      }).toString();

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/listing/?${query}`
        );
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchCourses();
  }, [get, keywords, selectedCategory, selectedSubCategory, RateRange, ageLimit, selectedGender]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              onSearch={handleSearch}
            />
          </div>
        </header>

        <div className="container mx-auto flex flex-1 px-4">
          {/* Sidebar Toggle for Mobile */}
          <aside
            className={`fixed top-0 left-0 z-10 h-full bg-white shadow-md transform ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform sm:relative sm:translate-x-0 sm:flex sm:w-1/4`}
          >
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onFilter={handleSearch}
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
              get={get}
              set={set}
            />
            <button
              className="absolute top-4 right-4 sm:hidden"
              onClick={() => setFilterOpen(false)}
            >
              Close
            </button>
          </aside>

          <main className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing, idx) => (
                <ListingCard
                  subCategoryName={subCategoryName}
                  categoryName={categoryName}
                  key={idx}
                  listingId={listing._id}
                  category={listing.category}
                  title={listing.title}
                  imageUrl = {listing.imageUrl}
                  priceMode={listing.priceMode}
                  price={listing.price}
                  mode={listing.mode}
                  location={listing.location}
                  avgRating={listing.avgRating}
                  trainerId={listing.trainerId}
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
                  description={listing.description}
                  isFavorite={listing.isFavorite}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No listings found.</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
