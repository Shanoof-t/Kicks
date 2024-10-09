import { createSlice } from "@reduxjs/toolkit";
import { registerDataPost } from "./registerAPI";
const initialState = {
  dataPostValue: {
    loading: false,
    error: "",
  },
  formValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  },
};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterFormValues: (state, action) => {
      if (action.payload.name === "firstName") {
        state.formValues.firstName = action.payload.value;
      } else if (action.payload.name === "lastName") {
        state.formValues.lastName = action.payload.value;
      } else if (action.payload.name === "email") {
        state.formValues.email = action.payload.value;
      } else if (action.payload.name === "password") {
        state.formValues.password = action.payload.value;
      } else if (action.payload.name === "confirmPassword") {
        state.formValues.confirmPassword = action.payload.value;
      } else if (action.payload.name === "gender") {
        state.formValues.gender = action.payload.value;
      }
    },
    setRegisterGender: (state, action) => {
      state.formValues.gender = action.payload;
    },
    setRegisterFormValuesNull: (state) => {
      state.formValues.firstName = "";
      state.formValues.lastName = "";
      state.formValues.email = "";
      state.formValues.password = "";
      state.formValues.confirmPassword = "";
      state.formValues.gender = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDataPost.pending, (state) => {
        state.dataPostValue.loading = true;
      })
      .addCase(registerDataPost.fulfilled, (state) => {
        state.dataPostValue.loading = false;
      })
      .addCase(registerDataPost.rejected, (state, action) => {
        state.dataPostValue.loading = false;
        state.dataPostValue.error = action.error.message;
      });
  },
});

export const {
  setRegisterFormValues,
  setRegisterGender,
  setRegisterFormValuesNull,
} = registerSlice.actions;
export default registerSlice.reducer;
