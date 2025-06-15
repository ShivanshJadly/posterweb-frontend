// src/slices/deliverySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryAddress: [], // Stores the list of delivery addresses
  selectedDelivery: null, // Stores the selected delivery address ID
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    // Action to set the list of delivery addresses
    setDeliveryAddress: (state, action) => {
      // Ensure payload is an array of addresses
      if (Array.isArray(action.payload)) {
        state.deliveryAddress = action.payload;
      } else {
        console.error("Invalid payload for setDeliveryAddress. Expected an array.");
      }
    },
    // Action to set the selected delivery address
    setSelectedDelivery: (state, action) => {
      const selectedId = action.payload;
      // Validate that the selected ID exists in deliveryAddress
      const isValid = state.deliveryAddress.some(address => address._id === selectedId);
      if (isValid) {
        state.selectedDelivery = selectedId;
      } else {
        console.error("Invalid delivery address ID. It does not exist in the list.");
      }
    },
  },
});

export const { setDeliveryAddress, setSelectedDelivery } = deliverySlice.actions;

export default deliverySlice.reducer;
