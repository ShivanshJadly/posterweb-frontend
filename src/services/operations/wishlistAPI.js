import { toast } from "react-hot-toast";
import {userEndpoints} from "../apis";
import { apiConnector } from "../apiConnector";

const { GET_WISHLIST_API, ADD_TO_WISHLIST_API, REMOVE_FROM_WISHLIST_API } = userEndpoints;

export const getWishlist = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET",GET_WISHLIST_API,null,{ Authorization: `Bearer ${token}` });

    if (!response?.data?.success) {
      throw new Error("Could not fetch wishlist");
    }

    result = response?.data?.data || []; 
  } catch (error) {
    console.error("GET_WISHLIST_API ERROR:", error);
    toast.error(error.message || "Something went wrong while fetching wishlist");
  }

  return result;
};


export const addToWIshList = async (posterId,token) => {
    try {
        const response = await apiConnector("POST", ADD_TO_WISHLIST_API, { posterId }, { Authorization: `Bearer ${token}`});
        if (!response?.data?.success) {
            throw new Error("Could not add to wishlist");
        }
        toast.success("Added to wishlist successfully");
    } catch (error) {
        console.error("ADD_TO_WISHLIST_API ERROR: ", error);
        toast.error(error.message || "Something went wrong while adding to wishlist");
    }
}