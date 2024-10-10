import { createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchUser } from "./checkoutAPI";
const initialState = {
  fetchUserData: {
    loading: false,
    userData: [],
    error: "",
  },
  addOrderData: {
    loading: false,
    userData: [],
    error: "",
  },
};
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserData.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserData.loading = false;
        state.fetchUserData.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserData.loading = false;
        state.fetchUserData.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.addOrderData.loading = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.addOrderData.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.addOrderData.loading = false;
        state.addOrderData.error = action.error.message;
      });
  },
});

export default checkoutSlice.reducer;
