import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Listing {
  _id: string;
  category: string;
  subCategory: string[];
}

const Categories = () => {
  const [getCategories, setCategories] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category`)
      .then((res) => {
        const categoriesData = Array.isArray(res.data) ? res.data : [];
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  // Function to manually scroll the container
  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 270; // One card width
      if (direction === "left") {
        containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="bg-white/30 container mx-auto py-12 relative">
      <h2 className="text-4xl font-bold text-center mb-5">
        Browse <span className="text-blue-600">Categories</span>
      </h2>

      {/* Left and Right Scroll Buttons */}
      <div className="flex items-center justify-between relative max-w-6xl mx-auto">
        {/* Left Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 z-10 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          style={{ visibility: getCategories.length > 4 ? "visible" : "hidden" }}
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Smooth Scrolling Container */}
        <div
          ref={containerRef}
          className="overflow-hidden flex space-x-6 max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex space-x-6"
            animate={{
              x: isHovered ? 0 : [0, -getCategories.length * 270, 0],
            }}
            transition={{
              ease: "linear",
              duration: 25, // Reduced the speed
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              width: `${getCategories.length * 270}px`,
            }}
          >
            {/* Loading Skeleton */}
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden shadow-md min-w-[250px] flex-shrink-0"
                    style={{ width: "250px" }}
                  >
                    <Skeleton height={200} />
                    <div className="p-4">
                      <Skeleton width="80%" />
                      <Skeleton width="60%" />
                    </div>
                  </div>
                ))
              : getCategories.map((category, i) => (
                  <div
                    onClick={() => router.push(`/${category.category}`)}
                    key={i}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:-translate-y-2 min-w-[250px]"
                    style={{ flexShrink: 0, width: "250px" }}
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={`/img/new/${category.category}.jpg`}
                        alt={category.category}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">
                        {category.category}
                      </h3>
                    </div>
                  </div>
                ))}
          </motion.div>
        </div>

        {/* Right Button */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 z-10 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          style={{ visibility: getCategories.length > 4 ? "visible" : "hidden" }}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Categories;
