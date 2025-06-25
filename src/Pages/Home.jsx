import { useEffect, useState } from "react";
import Product from "../components/Product";
import { getPoster } from "../services/operations/posterDetailsAPI";
import Section1 from "../components/core/Home/Section_1";
import InfiniteLoop from "../components/core/Home/InfiniteLoop";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "../context/theme";
import { FixedSizeGrid as Grid } from "react-window";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [gridProps, setGridProps] = useState({
    columnCount: 4,
    columnWidth: 350,
    rowHeight: 500,
    width: 1400,
    height: 1000,
  });

  const navigate = useNavigate();
  const visiblePosts = posts.slice(0, 8);

  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getPoster();
      setPosts(data);
    } catch (error) {
      console.log("poster nhi aaya");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // Responsive Grid Layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setGridProps({
          columnCount: 2,
          columnWidth: 240,
          rowHeight: 320,
          width: 480,
          height: 650,
        });
      } else if (width < 1024) {
        setGridProps({
          columnCount: 3,
          columnWidth: 250,
          rowHeight: 400,
          width: 780,
          height: 850,
        });
      } else {
        setGridProps({
          columnCount: 4,
          columnWidth: 350,
          rowHeight: 500,
          width: 1400,
          height: 1000,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewMore = () => {
    navigate("/allposters");
  };

  const [themeMode, setThemeMode] = useState("light");
  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
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
            <div className="flex flex-col justify-center items-center sm:mt-[10rem] md:mt-[15rem] lg:mt-0 mt-5">
              <div className="flex justify-center items-center w-full overflow-x-auto">
                <Grid
                  columnCount={gridProps.columnCount}
                  columnWidth={gridProps.columnWidth}
                  height={gridProps.height}
                  rowCount={2}
                  rowHeight={gridProps.rowHeight}
                  width={gridProps.width}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const index = rowIndex * gridProps.columnCount + columnIndex;
                    if (index >= visiblePosts.length) return null;
                    const post = visiblePosts[index];

                    return (
                      <div
                        style={{ ...style, padding: 4 }}
                        className="flex justify-center items-center h-fit"
                      >
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.3 }}
                          className="flex justify-center items-center h-fit"
                        >
                          <Product post={post} />
                        </motion.div>
                      </div>
                    );
                  }}
                </Grid>
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
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
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
    </ThemeProvider>
  );
};

export default Home;
