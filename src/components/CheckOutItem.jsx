import { useNavigate } from "react-router-dom";

const CheckOutItem = ({ item,quantity }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/poster/${item._id}`);
    }
    return (
        <div className="grid grid-cols-3 cursor-pointer h-[max-content] w-full border-b-2 border-black/10  m-2 p-2 cart-item">

            <img onClick={handleClick} src={item?.posterImage?.image} alt="item img" className="w-[50%] mx-1 mr-5 p-2" />


            <div className="flex flex-col col-span-2 gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-black font-semibold text-lg text-left mt-1">{item.posterName}</h1>
                    <h3 className="text-gray-500 text-sm text-left mt-1">{item.size}</h3>

                </div>
                <div className="flex justify-between items-center my-2 gap-4">
                    <span className="text-black-500 font-semibold">₹{item.price}</span>
                    <span className="text-gray-500 text-sm">{`quantity: ${item.quantity?item.quantity:quantity}`}</span>


                </div>
            </div>

        </div>
    );
};

export default CheckOutItem;
