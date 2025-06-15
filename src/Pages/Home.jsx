import { useEffect, useState } from "react";
import Product from "../components/Product";
import { getAllPoster } from "../services/operations/posterDetailsAPI";
import Section1 from "../components/core/Home/Section_1";
import InfiniteLoop from "../components/core/Home/InfiniteLoop";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const visibleCount = 8;
  const navigate = useNavigate();

  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getAllPoster();
      const shuffledData = data.sort(() => Math.random() - 0.5);
      setPosts(shuffledData);
    } catch (error) {
      console.log("Data nhi aaya");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleViewMore = () => {
    navigate("/allposters");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="relative overflow-hidden"
    >
      {/* Section 1 */}
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 1.3}}
        className="mt-20 h-60 lg:h-auto"
      >
        <Section1 />
      </motion.div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 1.3}}
        className="z-10 relative w-full h-full flex justify-center items-center"
      >
        {loading ? (
          <HomeSkeleton skeletonCount={8} />
        ) : posts.length > 0 ? (
          <div className="flex flex-col justify-center items-center sm:mt-[10rem] md:mt-[15rem] lg:mt-12 mt-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 auto-rows-custom lg:w-11/12 pt-0 md:pb-10 lg:pt-10 lg:pb-24 sm:gap-x-10 sm:gap-y-16 md:gap-y-14 lg:gap-y-32 lg:gap-x-14 h-auto">
              {posts.slice(0, visibleCount).map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1}}
                  transition={{ duration: 1.3}}
                  className="flex justify-center items-center h-fit"
                >
                  <Product post={post} />
                </motion.div>
              ))}
            </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.3}}
                className="flex justify-center sm:mt-6 lg:mt-4"
              >
                <button
                  onClick={handleViewMore}
                  className="relative px-6 py-3 rounded-lg group overflow-hidden m-2"
                >
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                  <span className="z-10 flex justify-center items-center gap-2">View More</span>
                </button>
              </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1.3}}
            className="flex justify-center items-center min-h-screen"
          >
            <p>No data found</p>
          </motion.div>
        )}
      </motion.div>

      {/* Infinite Loop Section */}
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 1.3}}
        className="mt-2"
      >
        <InfiniteLoop />
      </motion.div>
    </motion.div>
  );
};

export default Home;
