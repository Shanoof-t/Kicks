import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formValues: {
    email: "",
    password: "",
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
});
export const { setFormValues, setFormValuesNull } = loginSlice.actions;
export default loginSlice.reducer;
