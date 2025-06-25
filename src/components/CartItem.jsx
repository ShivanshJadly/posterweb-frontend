import { RiDeleteBin5Line } from "react-icons/ri";
import { remove } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../services/operations/cartAPI";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);


 const handleRemoveFromCart  = async () => {
    try {
      await removeFromCart(token, item?._id)
    }catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  const handleClick = () => {
    navigate(`/posters/${item?.poster?._id}`);
  };

  return (
    <div className="flex h-[16rem] border-b-2 pb-10 border-gray-200">
      {/* Left */}
      <div className="h-full w-[60%] lg:w-[18%] flex border-2 border-black relative">
        <img
          onClick={handleClick}
          src={item?.poster?.posterImage?.image}
          alt="item img"
          className="object-fill w-full h-full cursor-pointer"
        />
        <span className="absolute top-0 right-0 z-10 bg-black text-white rounded-full w-6 flex justify-center items-center animate-bounce">
          {item?.quantity}
        </span>
      </div>

      {/* Right */}
      <div className="w-[80%] flex justify-between flex-col p-4">
        <div>
          <div className="flex lg:flex-row flex-col gap-2 font-bold justify-between">
            <h1>{item?.poster?.title}</h1>
            <span>MRP : ₹ {item?.poster?.price}</span>
          </div>

          {/* For Large Screens */}
          <h3 className="hidden lg:block text-sm text-gray-500">
            {item?.poster?.description}
          </h3>

          {/* For Small Screens */}
          <h3 className="block lg:hidden text-xs text-gray-500">
            {item?.poster?.description?.slice(0, 80)}...
          </h3>

          <p className="text-sm mt-2 text-gray-500">Size : {item?.size}</p>
        </div>

        <div className="flex justify-end my-2">
          <RiDeleteBin5Line
            onClick={handleRemoveFromCart}
            className="cursor-pointer text-xl text-red-500 hover:text-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
