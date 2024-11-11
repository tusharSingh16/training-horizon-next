"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSideBar";
import ListingCard from "./ListingCard";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";


const SubCategory: React.FC<{ categoryName: string }> = ({ categoryName }) => {
  const router = useRouter();
  const [getCategory, setCategory] = useState([]);
  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  //   const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/v1/admin/category/${categoryName}`)
      .then((res) => {
        setCategory(res.data);
        
      });
  }, [categoryName]);

  //   const handleSearch = () => {
  //     const filtered = listings.filter((listing) => {
  //       const matchesKeywords =
  //         keywords === "" ||
  //         listing.title.toLowerCase().includes(keywords.toLowerCase());
  //       // const matchesLocation = location === '' || listing.location.toLowerCase().includes(location.toLowerCase());
  //       // return matchesKeywords && matchesLocation;
  //       return matchesKeywords;
  //     });

  //     setFilteredListings(filtered);
  //   };

  //   const handleFilter = () => {
  //     const filtered = listings.filter((listing) => {
  //       const matchesCategory =
  //         selectedCategories.length === 0 ||
  //         selectedCategories.includes(listing.category);
  //       return matchesCategory;
  //     });

  //     setFilteredListings(filtered);
  //   };
  // console.log(listings[0].trainerId);

  return (
    <>
      <div>{/* <h1>{listings[0].trainerId}</h1> */}</div>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto">
            {/* <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              // location={location}
              // setLocation={setLocation}
              onSearch={handleSearch}
            /> */}
          </div>
        </header>

        <div className="container mx-auto flex flex-1">
          <aside className="w-1/4">
            {/* <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              // onFilter={handleFilter}
            /> */}
          </aside>

          <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCategory.length>0 ? (
              getCategory.map((subCategory, idx) => (
                <div
                  onClick={() => {
                    router.push(`/${categoryName}/${subCategory}`);
                  }}
                  key={idx}
                  className="text-center p-4 border rounded-xl shadow-lg  hover:shadow-2xl cursor-pointer hover:bg-blue-100"
                >
                  <Image
                    src="/img/p1.svg"
                    alt="?"
                    width={28}
                    height={36}
                    className="w-28 h-36 mx-auto mb-4 "
                  />
                  <h3 className="font-medium">{subCategory}</h3>
                </div>
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

export default SubCategory;
