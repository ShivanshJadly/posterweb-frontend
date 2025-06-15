import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckOutItem from "../components/CheckOutItem";
import { BuyPoster } from "../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../components/core/CheckOut/DeliveryForm";
import { FaArrowLeft } from "react-icons/fa";
import { getDeliveryAddress } from "../services/operations/deliveryAPI";
import { setSelectedDelivery } from "../slices/deliverySlice";

const BuyNow = () => {
  const { directCheckoutItem } = useSelector((state) => state.buynow);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { deliveryAddress, selectedDelivery } = useSelector((state) => state.delivery);

  const [totalAmount, setTotalAmount] = useState(0);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!directCheckoutItem) {
      navigate(-1);
    }
  }, [directCheckoutItem, navigate]);

  useEffect(() => {
    if (directCheckoutItem) {
      setTotalAmount(directCheckoutItem.posts.price * directCheckoutItem.quantity);
    }
  }, [directCheckoutItem]);

  useEffect(() => {
    if (token) {
      dispatch(getDeliveryAddress(token)); // Fetch delivery details from backend
    }
  }, [token, dispatch]);

  const handlePayment = async () => {
    if (!selectedDelivery) {
      alert("Please select a delivery address before proceeding.");
      return;
    }

    // Retrieve selected delivery address details
    const deliveryId = deliveryAddress.find(
      (address) => address._id === selectedDelivery
    );

    if (!deliveryId) {
      alert("Selected delivery address is not valid.");
      return;
    }

    // Prepare poster details
    const posterDetails = [{
      posterId: directCheckoutItem.posts._id,
      quantity: directCheckoutItem.quantity,
    }];

    // Prepare user details
    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    try {
      // Make the payment API call
      await BuyPoster(token, posterDetails, userDetails, deliveryId, navigate, dispatch);
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center pt-24">
      <div className="flex flex-col lg:flex-row w-[80%] overflow-hidden">
        {/* Delivery Details Section */}
        <div className="lg:w-1/2 w-full p-4 pt-8">
          {!showDeliveryForm ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Delivery Address</h2>
              <form className="space-y-4">
                {deliveryAddress.length > 0 ? (
                  deliveryAddress.map((address) => (
                    <label
                      key={address._id}
                      className="flex items-start space-x-2 p-3 border rounded-lg cursor-pointer hover:shadow transition"
                    >
                      <input
                        type="radio"
                        name="deliveryAddress"
                        value={address._id}
                        checked={selectedDelivery === address._id}
                        onChange={() => dispatch(setSelectedDelivery(address._id))}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium">{address.address}</p>
                        <p className="text-sm text-gray-600">{`${address.city}, ${address.state}, ${address.pincode}`}</p>
                        <p className="text-sm text-gray-600">{`Phone: ${address.phoneNumber}`}</p>
                      </div>
                    </label>
                  ))
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
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/2 w-full p-4 lg:p-8 flex flex-col">
          <h2 className="text-2xl text-gray-800">Order Summary</h2>
          <div className="space-y-2">
            {/* Direct Checkout Item */}
            <div className="pr-2">
              {directCheckoutItem && (
                <CheckOutItem item={directCheckoutItem.posts} quantity={directCheckoutItem.quantity} />
              )}
            </div>
            <div className="flex justify-between ml-2 text-md text-gray-600">
              <span>Total Items:</span>
              <span>{directCheckoutItem?.quantity || 0}</span>
            </div>
            {/* Shipment Details */}
            <div className="flex justify-between text-md text-gray-600 ml-2">
              <span>Shipment:</span>
              <span>Free</span>
            </div>

            {/* Total Price */}
            <div className="flex justify-between text-xl font-bold text-gray-800 ml-2">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
            <p className="text-gray-600 text-[0.8rem] ml-2">The shipment is expected to be delivered within 3 to 4 business days.</p>

            {/* Pay Now Button */}
            <button
              onClick={handlePayment}
              className="w-full bg-black text-white font-medium text-lg py-3 rounded-lg transition duration-200 ml-2"
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
