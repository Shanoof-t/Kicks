import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const userFetch = createAsyncThunk("login/userFetch", async () => {
  const res = await axios.get(userURL);
  return res.data;
});
