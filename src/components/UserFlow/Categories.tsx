"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const categories = [
  { name: "Education", image: "/img/p1.svg" },
  { name: "Sports", image: "/img/p2.svg" },
  { name: "Boxing", image: "/img/p3.svg" },
  { name: "Gymnastics", image: "/img/p4.svg" },
  { name: "Swimming", image: "/img/p5.svg" },
  { name: "Dance", image: "/img/p6.svg" },
  { name: "Music", image: "/img/p7.svg" },
  { name: "Cycling", image: "/img/p8.svg" },
  { name: "Athletics", image: "/img/p9.svg" },
  { name: "Martial Arts", image: "/img/p10.svg" },

  // Add the rest of the categories here...
];
interface Listing {
  _id: string;
  category: string;
  subCategory: string[];

}
const Categories = () => {
  const [getCategories ,setCategories] = useState<Listing[]>([]);
  const router = useRouter();
  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/category`).then((res)=>{
      setCategories( res.data);
    })
},[])
  return (
    <section className="py-2">
      <div className="flex justify-between items-center px-4 pb-8">
        <h2 className="  text-2xl font-bold ">Our Top Categories</h2>
        <Link href="/courses">
          <button className="text-blue-400 text-xl hover:underline">
            View all
          </button>
        </Link>
      </div>
      <div className="px-2 sm:px-20 grid grid-cols-2  md:grid-cols-5 gap-4 0  ">
        {getCategories.map((category, index) => (
          <div
            onClick={() => {
              router.push(`/${category.category}`);
            }}
            key={index}
            className="text-center p-4 border rounded-xl shadow-lg  hover:shadow-2xl cursor-pointer hover:bg-blue-100"
          >
            <Image
              src="/img/p1.svg"
              alt="?"
              width={28}
              height={36}
              className="w-28 h-36 mx-auto mb-4 "
            />
            <h3 className="font-medium">{category.category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
