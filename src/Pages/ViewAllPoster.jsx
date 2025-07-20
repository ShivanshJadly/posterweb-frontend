import React, { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPoster } from "../services/operations/posterDetailsAPI"; // Original import
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton"; // Original import
import Product from "../components/Product"; // Original import

const ViewAllPoster = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState([]); // Stores all fetched posts to simulate pagination

  const observer = useRef();
  const containerRef = useRef(); // Not directly used for IntersectionObserver, but good to keep for potential future use

  const postsPerPage = 8; // Number of posts to load per page

  // Callback ref for the last post element to trigger infinite scrolling
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return; // If already loading, do nothing
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer if exists

      // Create a new IntersectionObserver
      observer.current = new IntersectionObserver((entries) => {
        // If the last element is intersecting and there are more posts to load
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment page to fetch more data
        }
      });

      // Observe the node if it exists
      if (node) observer.current.observe(node);
    },
    [loading, hasMore] // Dependencies: re-create observer if loading or hasMore changes
  );

  // Function to fetch product data
  const fetchProductData = async () => {
    if (!hasMore || loading) return; // Prevent fetching if no more data or already loading
    setLoading(true); // Set loading to true

    try {
      if (page === 1) {
        // On the first page, fetch all data (simulating a full dataset fetch)
        const data = await getPoster(); // Using original getPoster
        setAllPosts(data); // Store all data
        setPosts(data.slice(0, postsPerPage)); // Display first batch
        setHasMore(data.length > postsPerPage); // Check if there's more data than the first batch
      } else {
        // For subsequent pages, slice from the already fetched `allPosts`
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const newPosts = allPosts.slice(startIndex, endIndex);

        if (newPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts
          setHasMore(endIndex < allPosts.length); // Check if there are more posts in `allPosts`
        } else {
          setHasMore(false); // No more new posts
        }
      }
    } catch (error) {
      console.log("Data not found", error); // Log error
      setPosts([]); // Clear posts on error
      setHasMore(false); // No more data
    }
    setLoading(false); // Set loading to false after fetch
  };

  // Effect to call fetchProductData whenever the page changes
  useEffect(() => {
    fetchProductData();
  }, [page]); // Dependency array: runs when 'page' state changes

  return (
    <div className="w-full flex justify-center min-h-screen bg-gray-50 font-inter">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="z-10 relative w-full flex justify-center items-center py-8" // Added py-8 for vertical padding
      >
        {loading && posts.length === 0 ? (
          // Show skeleton loader if loading and no posts are yet displayed
          <div className="mt-24 px-4 w-full max-w-[1600px]">
            <HomeSkeleton skeletonCount={postsPerPage} /> {/* Using original HomeSkeleton */}
          </div>
        ) : posts.length > 0 ? (
          // Display posts if available
          <div className="flex flex-col justify-center items-center mt-12 pb-5 w-full"> {/* Adjusted mt-24 to mt-12 for better spacing */}
            <div
              ref={containerRef}
              className="w-full px-2 md:px-4 flex justify-center overflow-x-hidden"
            >
              {/* Grid layout: 2 columns on small screens, 3 on medium, 4 on large */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[1600px]">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    // Attach ref to the last element for infinite scrolling
                    ref={index === posts.length - 1 ? lastPostElementRef : null}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }} // Staggered animation for each product
                    className="flex justify-center items-center p-1 sm:p-2" // Reduced padding for tighter mobile fit
                  >
                    <Product post={post} /> {/* Using original Product component */}
                  </motion.div>
                ))}
              </div>
            </div>

            {loading && posts.length > 0 && (
              // Show skeleton loader at the bottom if more posts are loading
              <div className="mt-4 px-4 w-full max-w-[1600px]">
                <HomeSkeleton skeletonCount={2} /> {/* Using original HomeSkeleton */}
              </div>
            )}
            {!hasMore && posts.length > 0 && !loading && (
              <p className="text-gray-600 mt-8 text-center text-lg">You've reached the end of the list!</p>
            )}
          </div>
        ) : (
          // Display "No data found" if no posts and not loading
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
            className="flex justify-center items-center min-h-[calc(100vh-100px)] text-gray-700 text-xl" // Adjusted min-h-screen for better centering
          >
            <p>No data found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewAllPoster;
