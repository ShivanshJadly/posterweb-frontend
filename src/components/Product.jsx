import { useNavigate } from "react-router-dom";
import { AdaptiveImageDivForHome } from "./core/Home/AdaptiveImageDivForHome";

const Product = ({ post }) => {
  const navigate = useNavigate();

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  };

  return (
    <div className="w-[12.5rem] md:w-[18rem] lg:w-[20rem] flex flex-col justify-center lg:hover:scale-105 transition-all duration-300 ">
      <div className="flex-col justify-center items-center" onClick={handlePosterDetails}>
        <AdaptiveImageDivForHome images={post?.posterImage.image}/>
      <div className="w-full flex-col justify-center md:pr-5 md:pl-5 lg:pr-5 lg:pl-6 lg:mt-6 pr-1 pl-1 mt-3">
        <div className="flex justify-between w-full">
          <p className="text-sm sm:text-base">{post.title.slice(0,15)}...</p>
          <span className="text-sm sm:text-base">₹{post.price}</span>
        </div>

          <p className="text-[0.8rem] sm:text-sm text-gray-500 mt-1">{post.description.length > 30
            ? `${post.description.slice(0, 30)}...`
            : post.description}</p>
      </div>
      </div>
    </div>
  );
};

export default Product;
