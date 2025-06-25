import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
import { categoryEndpoints } from "../apis"
const {GET_ALL_CATEGORIES_API} = categoryEndpoints;

export const getAllCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_CATEGORIES_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch categories")
        }
        result = response?.data?.data || [];
    } catch (error) {
        console.error("GET_ALL_CATEGORIES_API ERROR: ", error);
        toast.error(error.message || "Something went wrong while fetching categories");
    }
    return result;
}

