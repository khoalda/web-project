import { createSlice } from "@reduxjs/toolkit";
import { updateMyInfo, readMyInfo } from "../../api/users";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    info: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.info = null;
    },
    updateInfo: (state, action) => {
      state.info = action.payload;
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutSuccess, updateInfo } =
  authSlice.actions;

export default authSlice.reducer;
