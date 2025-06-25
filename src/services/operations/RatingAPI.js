import { apiConnector } from "../../services/apiConnector";
import { toast } from "react-hot-toast";
import { reviewEndpoints} from "../apis"

const {ADD_REVIEW_API, GET_POSTER_REVIEWS_API} = reviewEndpoints

export const addReview = async (posterId, rating, comments, token) => {
  try {
    const response = await apiConnector(
      "POST",
      ADD_REVIEW_API,
      { rating: parseInt(rating), comments, posterId },
      {
        Authorization: `Bearer ${token}`
      }
    );

    console.log("res:",response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Review not added");
    }

    toast.success("Review submitted successfully.");
    return response.data.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    toast.error(error?.response?.data?.message || "Failed to submit review");
    return null;
  }
};

export const getPosterReviews = async (posterId) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_POSTER_REVIEWS_API,null,null,posterId
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to fetch reviews");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    toast.error("Failed to load reviews");
    return [];
  }
};