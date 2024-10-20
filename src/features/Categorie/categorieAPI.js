import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL } from "../../utils/API_URL";

export const fetchCategorieItems = createAsyncThunk(
  "categorie/fetchCategorieItems",
  async (categorieGender) => {
    const res = await axios.get(`${itemsURL}?gender=${categorieGender}`);
    return res.data;
  }
);
