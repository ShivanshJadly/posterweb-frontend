  // src/slices/deliverySlice.js

  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    deliveryAddress: [], 
    selectedDelivery: null,
  };

  const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
      
      setDeliveryAddress: (state, action) => {
        
        if (Array.isArray(action.payload)) {
          state.deliveryAddress = action.payload;
        } else {
          console.error("Invalid payload for setDeliveryAddress. Expected an array.");
        }
      },

      setSelectedDelivery: (state, action) => {
        const selectedId = action.payload;

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
