import { createSlice } from "@reduxjs/toolkit";

const buynowSlice = createSlice({
  name: "buynow",
  initialState: {
    directCheckoutItem: null,
  },
  reducers: {
    setDirectCheckoutItem: (state, action) => {
      state.directCheckoutItem = action.payload;
    },
    clearDirectCheckoutItem: (state) => {
      state.directCheckoutItem = null;
    },
  },
});

export const { setDirectCheckoutItem, clearDirectCheckoutItem } = buynowSlice.actions;
export default buynowSlice.reducer;
