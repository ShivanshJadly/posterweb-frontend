import { useEffect, useState } from "react";
import Product from "../components/Product";
import { getPoster } from "../services/operations/posterDetailsAPI";
import Section1 from "../components/core/Home/Section_1";
import InfiniteLoop from "../components/core/Home/InfiniteLoop";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Removed unused ThemeProvider and FixedSizeGrid imports

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // We only need to show the first 8 posts on the home page.
  const visiblePosts = posts.slice(0, 8);

  // Fetches all poster data when the component mounts.
  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getPoster();
      setPosts(data);
    } catch (error) {
      console.log("Could not fetch posters.", error);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleViewMore = () => {
    navigate("/allposters");
  };

  // The local theme state and useEffect have been removed.
  // The component now relies on the global theme context.

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="relative overflow-hidden text-black dark:bg-black dark:text-white"
    >
      {/* Section 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="mt-20 h-60 lg:h-auto"
      >
        <Section1 />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="z-10 relative w-full h-full flex justify-center items-center"
      >
        {loading ? (
          <HomeSkeleton skeletonCount={8} />
        ) : posts.length > 0 ? (
          <div className="flex flex-col justify-center items-center sm:mt-[10rem] md:mt-[15rem] lg:mt-10 mt-5">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-[1600px] px-2">
              {visiblePosts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.3 }}
                  className="flex justify-center px-1"
                >
                  <Product post={post} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="flex justify-center sm:mt-6 lg:mt-4"
            >
              <button
                onClick={handleViewMore}
                className="relative px-6 py-3 rounded-lg group overflow-hidden m-2"
              >
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                <span className="z-10 flex justify-center items-center gap-2">
                  View More
                </span>
              </button>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
            className="flex justify-center items-center min-h-screen"
          >
            <p>No data found</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="mt-2"
      >
        <InfiniteLoop />
      </motion.div>
    </motion.div>
  );
};

export default Home;
