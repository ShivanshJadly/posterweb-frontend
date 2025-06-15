import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  poster: null,
  paymentLoading: false,
}

const posterSlice = createSlice({
  name: "poster",
  initialState,
  reducers: {
    setPoster: (state, action) => {
      state.course = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    }
  },
})

export const {
  setPoster,
  setPaymentLoading,
} = posterSlice.actions

export default posterSlice.reducer
