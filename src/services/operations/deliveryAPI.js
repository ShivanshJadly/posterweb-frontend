import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../apis";
const { GET_ADDRESS_API, ADD_ADDRESS_API } = userEndpoints;

export const getAddress = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ADDRESS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could not fetch address");
    }

    result = response.data.data?.address || [];
  } catch (error) {
    console.error("GET_ADDRESS_API ERROR:", error);
    toast.error(error.message || "Something went wrong while fetching address");
  }

  return result;
};


export function addAddress(
  addressLine1,
  city,
  state,
  pincode,
  phoneNumber,
  isDefault,
  token
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        ADD_ADDRESS_API,
        {
          addressLine1,
          city,
          state,
          pincode,
          phoneNumber,
          isDefault,
        },
        { Authorization: `Bearer ${token}` }
      );

      dispatch(getAddress(token));
      if (!response.data) {
        throw new Error(response.data.message);
      }
      toast.success("Delivery address added");
    } catch (error) {
      console.log("ADD DELIVERY API ERROR............", error);
      toast.error("Failed to add delivery address");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
