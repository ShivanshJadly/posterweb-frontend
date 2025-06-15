import { createSlice } from "@reduxjs/toolkit";

// Helper functions for local storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Error loading cart from local storage", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to local storage", error);
  }
};

const initialState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { poster, size } = action.payload;
      const existingItem = state.find(
        (item) => item._id === poster._id && item.size === size
      ); // Check for both ID and size
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...poster, quantity: 1, size });
      }
      saveCartToLocalStorage(state);
    },
    addWithQuantity: (state, action) => {
      const { poster, quantity, size } = action.payload;
      const existingItem = state.find(
        (item) => item._id === poster._id && item.size === size
      ); // Check for both ID and size
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ ...poster, quantity, size });
      }
      saveCartToLocalStorage(state);
    },
    remove: (state, action) => {
      const { productId, size } = action.payload;
      const existingItem = state.find(
        (item) => item._id === productId && item.size === size
      ); // Check for both ID and size
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const newState = state.filter(
            (item) => !(item._id === productId && item.size === size)
          ); // Remove only the matching item
          saveCartToLocalStorage(newState);
          return newState;
        }
      }
      saveCartToLocalStorage(state);
    },
    resetCart: (state) => {
      const newState = [];
      saveCartToLocalStorage(newState);
      return newState; // Clears the cart
    },
    removePurchasedPosters(state, action) {
      const purchasedPosterIds = action.payload;
      return state.filter((item) => !purchasedPosterIds.includes(item._id));
    },
  },
});

export const { add, addWithQuantity, remove, resetCart, removePurchasedPosters } = cartSlice.actions;
export default cartSlice.reducer;
