import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckOutItem from "../components/CheckOutItem";
import { BuyPoster } from "../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../components/core/CheckOut/DeliveryForm";
import { FaArrowLeft } from "react-icons/fa";
import { getAddress } from "../services/operations/deliveryAPI";
import { setSelectedDelivery, setDeliveryAddress } from "../slices/deliverySlice";
import { motion } from "framer-motion";
import { getCartItems } from "../services/operations/cartAPI";
import { setCart } from "../slices/cartSlice";

const CheckOut = () => {
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { selectedDelivery } = useSelector((state) => state.delivery);

  const [totalAmount, setTotalAmount] = useState(0);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await getCartItems(token);
        dispatch(setCart(data));
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        dispatch(setCart([]));
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [token, dispatch]);

  useEffect(() => {
    const total = cart.reduce(
      // Calculate total amount from cart items
      (sum, item) => sum + item.poster?.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart]);

  //Fetch and set delivery address
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddress(token);
        setAddress(data);
        dispatch(setDeliveryAddress(data));
        const defaultAddr = data.find((addr) => addr.isDefault);
        if (defaultAddr) {
          dispatch(setSelectedDelivery(defaultAddr._id));
        }
      } catch (err) {
        console.error("Failed to fetch address:", err);
      }
    };
    if (token) fetchAddresses();
  }, [token, dispatch]);

  const handlePayment = async () => {
  if (!selectedDelivery) {
    alert("Please select a delivery address before proceeding.");
    return;
  }

  const deliveryObj = address.find((addr) => addr._id === selectedDelivery);
  if (!deliveryObj) {
    alert("Selected delivery address is not valid.");
    return;
  }

  const posterDetails = cart.map((item) => ({
    posterId: item.poster?._id,
    quantity: item.quantity,
    size: item?.size,
  }));

  const userDetails = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const paymentMethod = "Online";

  try {
    await BuyPoster(
      token,               
      totalAmount,     
      posterDetails,     
      userDetails,         
      deliveryObj,          
      paymentMethod,       
      navigate,             
      dispatch              
    );
  } catch (error) {
    console.error("Error during payment:", error);
    alert("Payment failed. Please try again.");
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center pt-24"
    >
      <div className="flex flex-col lg:flex-row w-[80%] overflow-hidden">
        {/* Delivery Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="lg:w-1/2 w-full p-4 pt-8"
        >
          {!showDeliveryForm ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Delivery Address
              </h2>
              <form className="space-y-4">
                {address.length > 0 ? (
                  address.map((addr) => {
                    const isSelected = selectedDelivery === addr._id;
                    return (
                      <label
                        key={addr._id}
                        className={`flex items-start space-x-2 p-3 border rounded-lg cursor-pointer transition ${
                          isSelected
                            ? "border-black bg-gray-100 shadow-md"
                            : "hover:shadow"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryAddress"
                          value={addr._id}
                          checked={isSelected}
                          onChange={(e) =>
                            dispatch(setSelectedDelivery(e.target.value))
                          }
                          className="mt-1"
                        />
                        <div>
                          <p className="font-medium">{addr.addressLine1}</p>
                          <p className="text-sm text-gray-600">
                            {`${addr.city}, ${addr.state}, ${addr.pincode}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            Phone: {addr.phoneNumber}
                          </p>
                          {addr.isDefault && (
                            <span className="text-xs text-green-600 font-medium">
                              Default Address
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <p>No delivery addresses found. Please add one.</p>
                )}
              </form>

              <button
                onClick={() => setShowDeliveryForm(true)}
                className="mt-6 w-full bg-black text-white font-medium text-lg py-3 rounded-lg transition duration-200"
              >
                Add Delivery Details
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowDeliveryForm(false)}
                className="mb-4 flex items-center text-gray-600 hover:text-black transition duration-200"
              >
                <FaArrowLeft />
                <span className="ml-2">Back</span>
              </button>
              <DeliveryForm setShowDeliveryForm={setShowDeliveryForm} />
            </div>
          )}
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="lg:w-1/2 w-full p-4 lg:p-8 flex flex-col"
        >
          <h2 className="text-2xl text-gray-800">Order Summary</h2>
          <div className="space-y-2">
            <div className="pr-2">
              {cart.map((item, index) => (
                <CheckOutItem
                  key={item._id}
                  item={{
                    _id: item.poster?._id,
                    title: item.poster?.title,
                    description: item.poster?.description,
                    price: item.poster?.price,
                    posterImage: item.poster?.posterImage,
                    size: item.size,
                    quantity: item.quantity,
                  }}
                  itemIndex={index}
                />
              ))}
            </div>
            <div className="flex justify-between ml-2 text-md text-gray-600">
              <span>Total Items:</span>
              <span>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between text-md text-gray-600 ml-2">
              <span>Shipment:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 ml-2">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
            <p className="text-gray-600 text-[0.8rem] ml-2">
              The shipment is expected to be delivered within 3 to 4 business days.
            </p>
            <button
              onClick={handlePayment}
              className="w-full bg-black text-white font-medium text-lg py-3 rounded-lg transition duration-200 ml-2"
            >
              PAY NOW
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckOut;
