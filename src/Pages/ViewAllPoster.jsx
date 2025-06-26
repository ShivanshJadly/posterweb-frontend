import React, { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPoster } from "../services/operations/posterDetailsAPI";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import Product from "../components/Product";

const ViewAllPoster = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  const observer = useRef();
  const containerRef = useRef();

  const postsPerPage = 8;

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
      console.log("Data not found");
      setPosts([]);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="z-10 relative w-full h-full flex justify-center items-center"
      >
        {loading && posts.length === 0 ? (
          <div className="mt-24">
            <HomeSkeleton skeletonCount={8} />
          </div>
        ) : posts.length > 0 ? (
          <div className="flex flex-col justify-center items-center mt-24 pb-5 w-full">
            {/* Grid layout inspired by your screenshot */}
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
                    transition={{ duration: 1.3 }}
                    className="flex justify-center items-center p-2"
                  >
                    <Product post={post} />
                  </motion.div>
                ))}
              </div>
            </div>

            {loading && posts.length > 0 && (
              <div className="mt-4">
                <HomeSkeleton skeletonCount={4} />
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
