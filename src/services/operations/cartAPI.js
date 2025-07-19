import { cartEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
const { ADD_CART, GET_CART_ITEMS, REMOVE_CART_ITEM } = cartEndpoints;

export const addToCart = async (token, posterId, size, quantity) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await apiConnector(
      "POST",
      ADD_CART,
      { poster: posterId, size, quantity },
      headers
    );

    if (!response?.data?.success) {
      throw new Error("Could not add poster to cart");
    }

    toast.success("Added to cart successfully");
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error(error?.response?.data?.message || "Failed to add to cart");
    throw error;
  }
};

export const getCartItems = async (token) => {
  let result = [];
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await apiConnector("GET", GET_CART_ITEMS, null, headers);
    if (!response?.data?.success) {
      throw new Error("Could not fetch cart items");
    }
    result = response?.data?.data || [];
    console.log("result:",result);
  } catch (error) {
    console.error("Error fetching to cart:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch cart");
    throw error;
  }
  return result;
};

export const removeFromCart = async (token, cartItemId ) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await apiConnector ( "DELETE", `${REMOVE_CART_ITEM}/${cartItemId}`, null, headers);
    if (!response?.data?.success) {
      throw new Error("Could not remove item from cart");
    }
  }catch (error) {
    console.error("Error removing from cart:", error);
    toast.error(error?.response?.data?.message || "Failed to remove item from cart");
    throw error;
  }
}
