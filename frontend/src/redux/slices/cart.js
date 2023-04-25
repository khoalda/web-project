import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.pId === action.payload.pId
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.pId === action.payload.pId
      );
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity === 1) {
          state.items.splice(index, 1);
        } else {
          item.quantity -= 1;
        }
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrementCartItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.pId === action.payload.pId
      );
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity === 1) {
          state.items.splice(index, 1);
        } else {
          item.quantity -= 1;
        }
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementCartItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.pId === action.payload.pId
      );
      if (index !== -1) {
        const item = state.items[index];
        item.quantity += 1;
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    // updateCart: (state, action) => {
    //   const { pId, quantity } = action.payload;
    //   const item = state.items.find((item) => item.pId === pId);
    //   if (item) {
    //     item.quantity = quantity;
    //     // Update the cart in the database here
    //     fetch(`/api/cart/${pId}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ quantity }),
    //     })
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error("Failed to update cart");
    //         }
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // },
    loadCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    loadCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
  // updateCart,
  loadCartRequest,
  loadCartSuccess,
  loadCartFailure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
