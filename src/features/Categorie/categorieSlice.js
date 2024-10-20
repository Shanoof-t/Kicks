import { createSlice } from "@reduxjs/toolkit";
import { fetchCategorieItems } from "./categorieAPI";
const initialState = {
  items: {
    loading: false,
    data: [],
    error: "",
  },
  load: true,
  categorieGender: "",
};
const categorieSlice = createSlice({
  name: "categorie",
  initialState,
  reducers: {
    setLoad: (state) => {
      state.load = !state.load;
    },
    setCategorieGender: (state, action) => {
      state.categorieGender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorieItems.pending, (state) => {
        state.items.loading = true;
      })
      .addCase(fetchCategorieItems.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload;
      })
      .addCase(fetchCategorieItems.rejected, (state, action) => {
        state.items.loading = false;
        state.items.error = action.error.message;
      });
  },
});
export const { setLoad, setCategorieGender } = categorieSlice.actions;
export default categorieSlice.reducer;
