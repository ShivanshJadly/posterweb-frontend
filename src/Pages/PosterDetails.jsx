import { useEffect, useState } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import { getPosterInfo } from "../services/operations/posterDetailsAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RatingStars from "../components/common/RatingStars";
import { FaBoxOpen } from "react-icons/fa";
import { IoPrintSharp } from "react-icons/io5";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AdaptiveImageDiv } from "../components/common/AdaptiveImageDiv";
import PosterDetailsSkeleton from "../components/common/skeleton/PosterDetailsSkeleton";
import { useSelector } from "react-redux";
import { addToCart } from "../services/operations/cartAPI";
import useTheme from "../context/theme";

const PosterDetails = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const posterId = useLocation().pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("A4");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  async function fetchProductData(posterId) {
    setLoading(true);
    try {
      const data = await getPosterInfo(posterId);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch poster data:", error);
      setPosts({});
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData(posterId);
  }, [posterId]);

  const addToCartV2 = async () => {
    if (!token) {
      navigate("/login");
    } else {
      if (!selectedSize) {
        toast.error("Please select a size before adding to the cart.");
        return;
      }
      try {
        await addToCart(token, posterId, selectedSize, quantity);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  const sizes = ["A3", "A4", "A5"];

  return (
    // FIXED: The className string is now correctly wrapped in a template literal
    <div className={`flex justify-evenly lg:w-full lg:mx-auto overflow-x-hidden pt-16 overflow-y-hidden ${themeMode === 'dark' ? 'bg-[#292929] text-white' : 'bg-white text-black'}`}>
      {loading ? (
        <PosterDetailsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-7 lg:mt-8 mb-5 lg:mb-8 lg:mx-4 lg:gap-4">
          {/* Right */}
          <AdaptiveImageDiv images={posts?.posterImage?.image} />

          {/* Left */}
          <div className="flex flex-col gap-5 p-8 lg:p-16">
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">{posts?.title}</h1>
              <RatingStars avgRating={posts?.averageRating} Star_Size={20} />
            </div>
            <h3>{posts.description}</h3>

            <div>
              <div className="flex justify-center items-center gap-2 mb-2 md:mb-2 lg:mb-0">
                <IoPrintSharp className="text-5xl md:text-4xl" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This product is made to order and is typically{" "}
                  <span className="font-bold">
                    printed in 1-4 working days.
                  </span>{" "}
                  Your entire order will ship out together.
                </p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <FaBoxOpen className="text-5xl md:text-4xl " />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Since this product is printed on demand especially for you,{" "}
                  <span className="font-bold">
                    it is not eligible for cancellations and returns.
                  </span>{" "}
                  Read our Return Policy.{" "}
                </p>
              </div>
            </div>
            {/* FIXED: Corrected the syntax for displaying the price */}
            <span>{`Price: ₹${posts?.price}`}</span>
            <div className="flex items-center gap-4">
              <span>Size:</span>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-20 h-12 text-base rounded-full font-semibold text-[12px] p-1 px-3 uppercase transition-colors duration-200 ${
                    selectedSize === size
                      ? (themeMode === 'dark' ? 'bg-white text-black' : 'bg-black text-white')
                      : (themeMode === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300')
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2>Quantity:</h2>
                 {/* FIXED: The className string is now correctly wrapped in a template literal */}
                <div className={`border w-[30%] h-10 lg:h-14 rounded-full flex justify-evenly items-center ${themeMode === 'dark' ? 'border-white' : 'border-black'}`}>
                  <TiMinus
                    onClick={() => {
                      quantity > 1
                        ? setQuantity(quantity - 1)
                        : setQuantity(quantity);
                    }}
                    className="cursor-pointer"
                  />
                  <div className="w-5 flex justify-center items-center">
                    {quantity}
                  </div>
                  <TiPlus
                    onClick={() => setQuantity(quantity + 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <button
                onClick={addToCartV2}
                className={`h-12 rounded-xl font-semibold text-[20px] p-1 px-3 uppercase transition-all duration-300 ${
                  themeMode === 'dark' 
                  ? 'border-2 border-white bg-transparent text-white hover:bg-white hover:text-black' 
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosterDetails;