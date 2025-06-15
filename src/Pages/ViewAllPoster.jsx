import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPoster } from '../services/operations/posterDetailsAPI';
import HomeSkeleton from '../components/common/skeleton/HomeSkeleton';
import Product from '../components/Product';

const ViewAllPoster = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🆕 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const data = await getAllPoster();
      setPosts(data);
    } catch (error) {
      console.log("Data not found");
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // 🆕 Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 🆕 Change Page Handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="z-10 relative w-full h-full flex justify-center items-center"
      >
        {loading ? (
          <div className='mt-24'>
            <HomeSkeleton skeletonCount={6} />
          </div>
        ) : currentPosts.length > 0 ? (
          <div className="flex flex-col justify-center items-center mt-24">
            <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-custom lg:w-11/12 pt-0 lg:pt-10 pb-8 lg:gap-y-32 lg:gap-x-14 h-auto">
              {currentPosts.map((post) => (
                <motion.div
                  key={post._id || post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.3 }}
                  className="flex justify-center items-center h-fit"
                >
                  <Product post={post} />
                </motion.div>
              ))}
            </div>

            {/* 🆕 Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex gap-4 mt-24 mb-10">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
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
    </div>
  );
};

export default ViewAllPoster;
