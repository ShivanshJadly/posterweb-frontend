import React, { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPoster } from "../services/operations/posterDetailsAPI";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import Product from "../components/Product";
import { VariableSizeGrid as Grid } from "react-window";

const ViewAllPoster = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const postsPerPage = 8;
  const observer = useRef();
  const gridRef = useRef();

  const columnCount = 4;
  const columnWidth = 350;

  const getRowHeight = useCallback(() => 600, []);
  const getColumnWidth = useCallback(() => columnWidth, []);

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

  const rowCount = Math.ceil(posts.length / columnCount);
  const gridHeight = Math.min(3, rowCount) * getRowHeight();

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
            <div className="w-full flex justify-center overflow-x-auto">
              <Grid
                ref={gridRef}
                columnCount={columnCount}
                rowCount={rowCount}
                columnWidth={getColumnWidth}
                rowHeight={getRowHeight}
                height={gridHeight}
                width={columnWidth * columnCount}
                overscanRowCount={2}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const index = rowIndex * columnCount + columnIndex;
                  if (index >= posts.length) return null;
                  const post = posts[index];

                  return (
                    <div
                      style={style}
                      className="flex justify-center items-center p-2"
                    >
                      <motion.div
                        key={post._id}
                        ref={
                          index === posts.length - 1
                            ? lastPostElementRef
                            : null
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.3 }}
                      >
                        <Product post={post} />
                      </motion.div>
                    </div>
                  );
                }}
              </Grid>
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
