import { useEffect, useState } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import { getPosterInfo } from "../services/operations/posterDetailsAPI";
import { useLocation } from "react-router-dom";
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

const PosterDetails = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const posterId = useLocation().pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("A4");
  const { token } = useSelector((state) => state.auth);

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
  console.log("token", token);
  const addToCartV2 = async () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to the cart.");
      return;
    }
    try {
      await addToCart(token, posterId, selectedSize, quantity);
      toast.success(
        `${quantity} item(s) of size ${selectedSize} added to Cart`
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const sizes = ["A3", "A4", "A5"];
  console.log("data:", posts);

  return (
    <div className="flex justify-evenly lg:w-full lg:mx-auto overflow-x-hidden pt-16 overflow-y-hidden dark:bg-[#292929] dark:text-white">
      {loading ? (
        <PosterDetailsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-7 lg:mt-8 mb-5 lg:mb-8 lg:mx-4 lg:gap-4">
          {/* Right  */}
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
                <p className="text-xs text-gray-500">
                  This product is made to order and is typically{" "}
                  <span className="font-bold">
                    printed in 1-4 working days.
                  </span>{" "}
                  Your entire order will ship out together.
                </p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <FaBoxOpen className="text-5xl md:text-4xl " />
                <p className="text-xs text-gray-500">
                  Since this product is printed on demand especially for you,{" "}
                  <span className="font-bold">
                    it is not eligible for cancellations and returns.
                  </span>{" "}
                  Read our Return Policy.{" "}
                </p>
              </div>
            </div>
            <span>{`Price: ₹${posts?.price}`}</span>
            <div className="flex items-center gap-4">
              <span>Size:</span>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-20 h-12 text-base rounded-full font-semibold text-[12px] p-1 px-3  uppercase ${
                    selectedSize === size
                      ? "bg-black text-white "
                      : "bg-white text-black"
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
                <div className="border border-black w-[30%] h-10 lg:h-14 rounded-full flex justify-evenly items-center dark:border-2 dark:border-white">
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
                className=" bg-black h-12 text-white rounded-xl font-semibold text-[20px] p-1 px-3 uppercase transition dark:border-2 dark:border-white dark:text-black dark:bg-transparent"
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
