import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import deliveryReducer from "../slices/deliverySlice"
import buynowReducer from "../slices/buynowSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  delivery: deliveryReducer,
  buynow: buynowReducer

})

export default rootReducer
