import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoryWisePosterV2 } from "../../../services/operations/posterDetailsAPI";
import Product from "../../Product";
import CategoriesSkeleton from "../../common/skeleton/CategoriesSkeleton";
import { motion } from "framer-motion"; // Import motion for animations

const CategoryWisePosterPage = () => {
  const { id: categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryWisePoster = async () => {
      try {
        const response = await getCategoryWisePosterV2(categoryId);
        setCategoryData(response?.posters || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError("Failed to load category data. Please try again later.");
        setLoading(false); // Update category name on error
      }
    };

    if (categoryId) {
      fetchCategoryWisePoster();
    }
  }, [categoryId]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20 mb-5 min-h-[calc(100vh-100px)]"> {/* Added min-h to center skeleton */}
        <CategoriesSkeleton skeletonCount={6} />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-100px)] text-red-600 text-xl font-semibold mt-20">
        <p>{error}</p>
        <p className="text-gray-500 text-base mt-2">Please check your internet connection or try again later.</p>
      </div>
    );

  return (
    <div className="w-full flex justify-center min-h-screen bg-gray-50 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial animation state (fade in and move up slightly)
        animate={{ opacity: 1, y: 0 }} // Final animation state
        transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
        className="w-full max-w-screen-xl px-4 py-10 mt-20 sm:mt-14 lg:mt-10" // Main content wrapper with responsive padding and top margin
      >
        {categoryData.length > 0 ? (
          <div
            className="
              grid gap-6             /* Increased gap for better spacing between products */
              grid-cols-2          /* Default to 2 columns on mobile */
              sm:grid-cols-2       /* Keep 2 columns on small screens */
              md:grid-cols-3       /* 3 columns on medium screens */
              lg:grid-cols-4       /* 4 columns on large screens */
              xl:grid-cols-4       /* 4 columns for extra large screens (desktops) */
            "
          >
            {categoryData.map((poster, index) => (
              <motion.div
                key={poster._id}
                initial={{ opacity: 0, scale: 0.9 }} // Initial animation for each product
                animate={{ opacity: 1, scale: 1 }} // Final animation for each product
                transition={{ duration: 0.5, delay: index * 0.08 }} // Staggered animation for a nicer effect
                className="flex justify-center p-1 sm:p-2" // Padding around each product for visual separation
              >
                <Product post={poster} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl font-medium text-gray-600 py-20"> {/* Increased vertical padding for no data message */}
            No posters found in this category.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryWisePosterPage;
