import { createSlice } from "@reduxjs/toolkit";
import { userFetch } from "./loginAPI";
import { DateSchema } from "yup";

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
  reducers: {
    setFormValues: (state, action) => {
      if (action.payload.name === "email") {
        state.formValues.email = action.payload.value;
      } else if (action.payload.name === "password") {
        state.formValues.password = action.payload.value;
      }
    },
    setFormValuesNull: (state) => {
      state.formValues.email = "";
      state.formValues.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.pending, (state) => {
        state.userFetchValues.loading = true;
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.userFetchValues.loading =false
        state.userFetchValues.data = action.payload;
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.userFetchValues.error = action.error.message;
      });
  },
});
export const { setFormValues, setFormValuesNull } = loginSlice.actions;
export default loginSlice.reducer;
