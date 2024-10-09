import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
});

export const {
  setRegisterFormValues,
  setRegisterGender,
  setRegisterFormValuesNull,
} = registerSlice.actions;
export default registerSlice.reducer;
