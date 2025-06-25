import { createSlice } from "@reduxjs/toolkit";
const getCartKey = (email) => (email ? `cart_${email}` : "cart_guest");

// Helper functions for local storage
export const loadCartFromLocalStorage = (email) => {
  try {
    const key = getCartKey(email);
    const serializedCart = localStorage.getItem(key);
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Error loading cart from local storage", error);
    return [];
  }
};

export const saveCartToLocalStorage = (cart, email) => {
  try {
    const key = getCartKey(email);
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(key, serializedCart);
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
      const { poster, size, email  } = action.payload;
      const existingItem = state.find(
        (item) => item._id === poster._id && item.size === size
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...poster, quantity: 1, size });
      }
      saveCartToLocalStorage(state, email);
    },
    addWithQuantity: (state, action) => {
      const { poster, quantity, size, email } = action.payload;
      const existingItem = state.find(
        (item) => item._id === poster._id && item.size === size
      );  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ ...poster, quantity, size });
      }
      saveCartToLocalStorage(state, email);
    },
    remove: (state, action) => {
      const { productId, size } = action.payload;
      const existingItem = state.find(
        (item) => item._id === productId && item.size === size
      );
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
      return newState; 
    },
    removePurchasedPosters(state, action) {
      const purchasedPosterIds = action.payload;
      return state.filter((item) => !purchasedPosterIds.includes(item._id));
    },
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { add, addWithQuantity, remove, resetCart, removePurchasedPosters, setCart, } = cartSlice.actions;
export default cartSlice.reducer;
