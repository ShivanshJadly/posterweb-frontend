import {toast} from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { setDeliveryAddress } from "../../slices/deliverySlice"
import { apiConnector } from "../apiConnector"
import { deliveryEndpoints } from "../apis"

const {
    GET_DELIVERY_ADDRESS_API,
    ADD_DELIVERY_API
} = deliveryEndpoints

export function getDeliveryAddress(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_DELIVERY_ADDRESS_API, null, { Authorization: `Bearer ${token}` })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setDeliveryAddress(response.data.deliveryAddresses))
    } catch (error) {
      console.log("GET DELIVERY ADDRESS API ERROR............", error)
      toast.error("Failed to get delivery address")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function addDelivery(address, city, state, pincode, phoneNumber, isDefault, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", ADD_DELIVERY_API, {
        address,
        city,
        state,
        pincode,
        phoneNumber,
        isDefault
      },{Authorization: `Bearer ${token}`})
      
      dispatch(getDeliveryAddress(token));
      if (!response.data) {
        throw new Error(response.data.message)
      }
      toast.success("Delivery address added")
    } catch (error) {
      console.log("ADD DELIVERY API ERROR............", error)
      toast.error("Failed to add delivery address")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}