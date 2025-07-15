import { toast } from "react-hot-toast";
import { orderEndpoints, posterEndpointsV2 } from "../apis";
import { apiConnector } from "../apiConnector";

const {
  GET_POSTER_INFO_API,
  GET_POSTER_API,
  GET_CATEGORY_WISE_POSTER_API,
  GET_SEARCH_POSTER_API,
  GET_SUGGEST_POSTER_API,
} = posterEndpointsV2;

const { GET_ORDER_API } = orderEndpoints;

export const getPoster = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_POSTER_API);
    if (!response?.data?.success) {
      throw new Error("Could not fetch poster");
    }
    console.log(response);
    result = response?.data?.data?.posters || [];
  } catch (error) {
    console.error("getPoster API error:", error);
    toast.error(error.message || "Something went wrong");
  }
  return result;
};

export const getPosterInfo = async (posterId) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      `${GET_POSTER_INFO_API}/${posterId}`
    );
    if (!response?.data?.success) {
      throw new Error("Could not fetch poster data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("POSTER_DETAILS_API API ERROR: ", error);
    toast.error(error.message || "Something went wrong");
  }
  return result;
};

export const getOrderHistory = async (token) => {
  try {
    const response = await apiConnector("GET", GET_ORDER_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could not fetch order history");
    }
    console.log("response:", response.data.data);
    console.log("res:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Could not fetch the order-history");
  }
};

// get category wise poster
export const getCategoryWisePoster = async (categoryId) => {
  let result = [];
  try {
    const response = await apiConnector("POST", GET_CATEGORY_WISE_POSTER_API, {
      categoryId,
    });
    if (!response?.data?.success) {
      throw new Error("Could not fetch poster data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_CATEGORY_WISE_POSTER_API API ERROR: ", error);
    toast.error(error.message);
  }
  return result;
};

export const getCategoryWisePosterV2 = async (categoryId) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      `${GET_CATEGORY_WISE_POSTER_API}/${categoryId}`
    );
    if (!response?.data?.success) {
      throw new Error("Could not fetch poster data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_CATEGORY_WISE_POSTER_API API ERROR: ", error);
    toast.error(error.message || "Something went wrong");
  }
  return result;
};

export const searchPostersAPI = async ({ query, page = 1, limit = 20 }) => {
  const url = `${GET_SEARCH_POSTER_API}?query=${encodeURIComponent(
    query
  )}&page=${page}&limit=${limit}`;

  try {
    const response = await apiConnector("GET", url);
    return response?.data?.data?.posters; 
  } catch (error) {
    console.error("Error searching posters:", error);
    throw error;
  }
};

export const suggestPosters = async (query) => {
  try {
    const response = await apiConnector("GET","GET_SUGGEST_POSTER_API", null, null, { query });

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
