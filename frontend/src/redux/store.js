import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import cartSlice from "./slices/cart";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

export default store;
