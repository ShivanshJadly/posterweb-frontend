import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../apis"

const {LOGIN_API, SIGNUP_API} = userEndpoints

export function signUp(fullName, email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        fullName,
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
      return { success: true }; 
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");

      return { error: true, message: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      console.log("user: ",response);
      dispatch(setToken(response.data.data.accessToken))

      const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.user.fullName}`

      dispatch(setUser({ ...response.data.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.data.accessToken))
      navigate("/")
      
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Incorrect email or password!")
    }
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("emailId")

    toast.success("Logged Out")
    navigate("/")
  }
}




