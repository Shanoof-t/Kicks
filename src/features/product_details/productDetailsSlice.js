import { createSlice } from "@reduxjs/toolkit";
import { updateCartSize } from "./productDetailsAPI";

const initialState = {
  productDetailsLoading: false,
  error: {
    sizeError: "",
    updateError: "",
  },
};
const productDetailsSlice = createSlice({
  name: "product-details",
  initialState,
  reducers: {
    setSizeError: (state, action) => {
      state.error.sizeError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartSize.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(updateCartSize.fulfilled, (state) => {
        state.productDetailsLoading = false;
      })
      .addCase(updateCartSize.rejected, (state, action) => {
        state.error.updateError = action.error.message;
      });
  },
});

export const { setSizeError } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
