import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const fetchUser = createAsyncThunk(
  "checkout/fetchUser",
  async (user) => {
    const res = await axios.get(`${userURL}/${user}`);
    return res.data;
  }
);

export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async ({ user, contactDetails, userDetails }) => {
    const existingOrders = userDetails.data.order || [];
    const updatedOrder = [...existingOrders, contactDetails];
    await axios.patch(`${userURL}/${user}`, {
      order: updatedOrder,
      cart: [],
    });
  }
);
