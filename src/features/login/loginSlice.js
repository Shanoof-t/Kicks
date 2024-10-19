import { createSlice } from "@reduxjs/toolkit";
import { userFetch } from "./loginAPI"; 
const initialState = {
  formValues: {
    email: "",
    password: "",
  },
  userFetchValues: {
    loading: false,
    data: [],
    error: "",
  },
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.pending, (state) => {
        state.userFetchValues.loading = true;
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.userFetchValues.loading = false;
        state.userFetchValues.data = action.payload;
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.userFetchValues.error = action.error.message;
      });
  },
});
export default loginSlice.reducer;
