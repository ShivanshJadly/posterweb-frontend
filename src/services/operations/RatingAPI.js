import { apiConnector } from "../../services/apiConnector";
import { posterEndpoints } from "../apis";
import { toast } from "react-hot-toast";
const { GET_AVERAGE_RATING_API,CREATE_POSTER_RATING_API } = posterEndpoints;

export async function getAvgRating(posterId,token) {
    try {
        const response = await apiConnector(
            "POST",
            GET_AVERAGE_RATING_API,
            { posterId },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.data?.success) {
            throw new Error(response.data?.message || "Failed to fetch rating");
        }

        return response.data.averageRating;  // Return the rating directly
    } catch (error) {
        console.error("GET AVG RATING API ERROR:", error);
        return null; // Return null or some fallback value
    }
}

export const createRating = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_POSTER_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    toast.success("Rating Added");
    result = response?.data?.data;
  } catch (error) {
    if(error.status === 403){
      toast.error("Poster already reviewed by user");
    }
    else{
      console.log("CREATE_RATING_API API ERROR............", error);
      toast.error(error.message || "Something went wrong while adding the rating");
    }
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

