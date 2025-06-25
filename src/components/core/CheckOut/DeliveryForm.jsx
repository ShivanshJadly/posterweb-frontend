import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../../services/operations/deliveryAPI";

const DeliveryForm = ({setShowDeliveryForm}) => {
  const dispatch = useDispatch();

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
  });
  const { token } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFunc = async (e) => {
    e.preventDefault();

    // Validate fields
    const { firstName, lastName, address, city, state, pincode, phoneNumber } = deliveryDetails;
    if (!firstName || !lastName || !address || !city || !state || !pincode || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      dispatch(addAddress(address, city, state, pincode, phoneNumber,false, token));
        setDeliveryDetails({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          phoneNumber: "",
        });
        setShowDeliveryForm(false);
    } catch (error) {
      console.error("Error during adding delivery details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Delivery Details</h1>
        <form className="flex flex-col gap-y-6">
          {/* Country */}
          <label>
            <input
              type="text"
              value="INDIA"
              readOnly
              className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </label>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                value={deliveryDetails.firstName}
                onChange={handleInputChange}
                className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={deliveryDetails.lastName}
                onChange={handleInputChange}
                className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              />
            </label>
          </div>

          {/* Address */}
          <label>
            <input
              required
              type="text"
              name="address"
              placeholder="Address"
              value={deliveryDetails.address}
              onChange={handleInputChange}
              className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
            />
          </label>

          {/* City, State, PIN Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <label>
              <input
                required
                type="text"
                name="city"
                placeholder="City"
                value={deliveryDetails.city}
                onChange={handleInputChange}
                className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name="state"
                placeholder="State"
                value={deliveryDetails.state}
                onChange={handleInputChange}
                className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name="pincode"
                placeholder="PIN Code"
                value={deliveryDetails.pincode}
                onChange={handleInputChange}
                className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              />
            </label>
          </div>

          {/* Phone */}
          <label>
            <input
              required
              type="text"
              name="phoneNumber"
              placeholder="Phone"
              value={deliveryDetails.phoneNumber}
              onChange={handleInputChange}
              className="form-input w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
            />
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSaveFunc}
            className="mt-8 w-full h-12 bg-black text-white rounded-lg hover:bg-gray-900"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
