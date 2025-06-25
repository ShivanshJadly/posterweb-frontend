import { useEffect, useState,Suspense } from "react";
import { getAllCategories } from "../services/operations/categoryAPI";
import { FocusCards } from "../components/ui/Focus-card";
import { motion } from "framer-motion";
import CategoriesSkeleton from "../components/common/skeleton/CategoriesSkeleton";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await getAllCategories();
        console.log("category", res);
        console.log("length", res?.length);
        if (res?.length > 0) {
          const generatedCards = res.map((category) => ({
            title: category.name,
            categoryId: category._id,
            image: category.coverImage, 
          }));
          setCategories(res);
          setCards(generatedCards);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-gray-200 animate-pulse"></div>
      }
    >
      {/* Page Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={loading ? {} : { opacity: 1, y: 0 }}
        transition={{
          delay: loading ? 0 : 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 pt-24 "
      >
        <div className="text-3xl md:text-8xl font-bold dark:text-black text-center pb-10 tracking-widest">
          Collections
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={loading ? {} : { opacity: 1, y: 0 }}
        transition={{
          delay: loading ? 0 : 0.5,
          duration: 1,
          ease: "easeInOut",
        }}
        className="pt-4 p-6"
      >
        {loading ? (
          <CategoriesSkeleton skeletonCount={window.innerWidth > 768 ? 6 : 3} />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-red-500 font-semibold"
          >
            Failed to load categories. Please try again later.
          </motion.div>
        ) : categories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FocusCards cards={cards} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 font-medium"
          >
            No categories available.
          </motion.div>
        )}
      </motion.div>
    </Suspense>
  );
};

export default Categories;
