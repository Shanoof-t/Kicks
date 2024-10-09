import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const updateCartSize = createAsyncThunk(
  "productdetails/updateCartSize",
  async ({ user, cartItems, cartData }) => {
    const existingCart = cartItems || [];
    const updatedCart = [...existingCart, ...cartData];
    const res = axios.patch(`${userURL}/${user}`, {
      cart: updatedCart,
    });
    return (await res).data;
  }
);
