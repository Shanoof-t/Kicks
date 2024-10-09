import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const registerDataPost = createAsyncThunk(
  "register/registerDataPost",
  async (data) => {
    const res = await axios.post(userURL,data);
    return res.data;
  }
);
