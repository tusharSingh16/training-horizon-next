"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Listing {
  _id: string;
  category: string;
  subCategory: string[];
}

const Categories = () => {
  const [getCategories, setCategories] = useState<Listing[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="flex justify-between items-center px-4 sm:px-8 pb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Our Top Categories</h2>
        <Link href="/all/courses">
          <button className="text-blue-500 text-xl sm:text-2xl hover:underline">
            View all
          </button>
        </Link>
      </div>

      {/* Container for Horizontal Scroll on Mobile, Full Width on Desktop */}
      <div className="px-4 sm:px-8 overflow-x-auto md:overflow-visible">
        {/* Flex container for categories */}
        <div className="flex flex-nowrap space-x-6 md:space-x-8 justify-start md:justify-between">
          {getCategories.map((category, index) => (
            <div
              onClick={() => {
                router.push(`/${category.category}`);
              }}
              key={index}
              className="text-center p-6 border border-gray-200 rounded-sm shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 cursor-pointer min-w-[200px]"
            >
              {/* Category Image */}
              <Image
                src="/img/p1.svg" // This should be dynamic depending on category, if images vary
                alt={category.category}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="font-medium text-lg sm:text-xl text-gray-700">{category.category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
