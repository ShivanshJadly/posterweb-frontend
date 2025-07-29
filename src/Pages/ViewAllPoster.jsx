import React, { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPoster } from "../services/operations/posterDetailsAPI";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import Product from "../components/Product";
import useTheme from "../context/theme"; // ADDED: Import useTheme to get the global theme state

const ViewAllPoster = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState([]); // Stores all fetched posts to simulate pagination

  const observer = useRef();
  const containerRef = useRef();

  const { themeMode } = useTheme(); // ADDED: Get the current theme mode from the context

  const postsPerPage = 8; // Number of posts to load per page

  // Callback ref for the last post element to trigger infinite scrolling
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Function to fetch product data
  const fetchProductData = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      if (page === 1) {
        const data = await getPoster();
        setAllPosts(data);
        setPosts(data.slice(0, postsPerPage));
        setHasMore(data.length > postsPerPage);
      } else {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const newPosts = allPosts.slice(startIndex, endIndex);

        if (newPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setHasMore(endIndex < allPosts.length);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log("Data not found", error);
      setPosts([]);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Effect to call fetchProductData whenever the page changes
  useEffect(() => {
    fetchProductData();
  }, [page]);

  return (
    // UPDATED: Main container now has theme-aware background colors
    <div className="w-full flex justify-center min-h-screen bg-gray-50 dark:bg-black font-inter">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="z-10 relative w-full flex justify-center items-center py-8"
      >
        {loading && posts.length === 0 ? (
          <div className="mt-24 px-4 w-full max-w-[1600px]">
            <HomeSkeleton skeletonCount={postsPerPage} />
          </div>
        ) : posts.length > 0 ? (
          <div className="flex flex-col justify-center items-center mt-12 pb-5 w-full">
            <div
              ref={containerRef}
              className="w-full px-2 md:px-4 flex justify-center overflow-x-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[1600px]">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    ref={index === posts.length - 1 ? lastPostElementRef : null}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex justify-center items-center p-1 sm:p-2"
                  >
                    <Product post={post} />
                  </motion.div>
                ))}
              </div>
            </div>

            {loading && posts.length > 0 && (
              <div className="mt-4 px-4 w-full max-w-[1600px]">
                <HomeSkeleton skeletonCount={2} />
              </div>
            )}
            {!hasMore && posts.length > 0 && !loading && (
              // UPDATED: "End of list" text is now theme-aware
              <p className="text-gray-600 dark:text-gray-400 mt-8 text-center text-lg">You've reached the end of the list!</p>
            )}
          </div>
        ) : (
          // UPDATED: "No data found" text container is now theme-aware
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
            className="flex justify-center items-center min-h-[calc(100vh-100px)] text-gray-700 dark:text-gray-300 text-xl"
          >
            <p>No data found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewAllPoster;
