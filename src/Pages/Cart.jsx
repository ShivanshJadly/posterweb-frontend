import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import emptyBox from "../additionalFile/empty-box.png";
import spider from "../additionalFile/spider.png";
import Product from "../components/Product";
import { getPoster } from "../services/operations/posterDetailsAPI";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";
import { motion } from "framer-motion";
import { getCartItems } from "../services/operations/cartAPI";
import Spinner from "../components/Spinner";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [allPosters, setAllPosters] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const fetchCartItems = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getCartItems(token);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setPosts([]);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  useEffect(() => {
    const total = posts.reduce(
      (sum, item) => sum + (item.poster?.price || 0) * (item.quantity || 0),
      0
    );
    setTotalAmount(total);
  }, [posts]);

  useEffect(() => {
    const fetchAllPosters = async () => {
      try {
        const data = await getPoster();
        setAllPosters(data);
      } catch (err) {
        console.error("Error fetching all posters", err);
      }
    };
    fetchAllPosters();
  }, []);

  const cartPosterIds = posts.map((item) => item?.poster?._id);
  const cartTags = new Set(posts.flatMap((item) => item.poster?.tags || []));

  const filteredPosts = allPosters
    .filter(
      (poster) =>
        poster.tags?.some((tag) => cartTags.has(tag)) &&
        !cartPosterIds.includes(poster._id)
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (pageLoading) return <Spinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="w-11/12 mx-auto pt-24"
    >
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {posts.map((item, index) => (
              <CartItem
                key={item._id}
                item={item}
                itemIndex={index}
                refreshCart={fetchCartItems}
              />
            ))}
          </motion.div>

          {/* Right: Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white shadow-md p-4 lg:p-6 rounded-lg border w-full"
          >
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">Summary</h1>
            <p className="text-gray-700 font-medium text-sm lg:text-base">
              Items:{" "}
              <span className="font-bold text-black">
                {posts.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </p>
            <p className="text-gray-700 font-medium text-sm lg:text-base mt-2">
              Total:{" "}
              <span className="font-bold text-black">
                ₹{totalAmount.toFixed(2)}
              </span>
            </p>
            <Link to="/checkout">
              <button className="bg-black text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold w-full mt-4 hover:scale-105 transition-transform duration-300 text-sm lg:text-base">
                Check Out
              </button>
            </Link>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-3 mt-6 lg:mt-10"
          >
            <h2 className="text-lg lg:text-xl font-semibold mb-4 text-center lg:text-left">
              You may also like
            </h2>
            <div className="flex flex-col lg:flex gap-4 justify-center lg:justify-start items-center">
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-6 mb-8 sm:w-full sm:h-full">
                {loading ? (
                  <div className="flex justify-center w-full">
                    <HomeSkeleton skeletonCount={3} />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      className="w-1/2 sm:w-1/2 md:w-[30%] lg:min-w-[15rem] flex mb-4"
                      key={post?._id}
                    >
                      <Product post={post} />
                    </div>
                  ))
                ) : (
                  <div className="text-center">No recommendations found</div>
                )}
              </div>
              <Link
                to="/allposters"
                className="relative group text-black mb-4 text-sm lg:text-base"
              >
                View More
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3 }}
          className="flex flex-col justify-center lg:pb-60 lg:pt-48 items-center transition-all duration-300 h-screen"
        >
          <img
            src={emptyBox}
            alt="empty-box"
            className="w-30 sm:w-40 lg:w-50 mix-blend-darken"
          />
          <img
            src={spider}
            alt="spider"
            className="w-[100px] md:w-[130px] lg:w-[150px] right-5 absolute opacity-40"
            style={{ top: "3.5rem" }}
          />
          <h1 className="font-semibold text-gray-700 m-4 text-sm lg:text-base">
            NO ITEM IN THE BAG
          </h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cart;
