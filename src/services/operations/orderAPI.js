import { orderEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-toastify";
const { CREATE_ORDER_API, GET_ORDER_HISTORY_API, UPDATE_ORDER_STATUS_API } = orderEndpoints;
export const createOrder = async () => {
  try {
    const response = await apiConnector("POST", CREATE_ORDER_API, {orderItems, shippingAddress, paymetMethod});
    if (!response?.data?.success) {
      throw new Error("Could not create order");
    }
    console.log("Order created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    toast.error(error.message || "Something went wrong while creating the order");
    throw error; 
  }
}



