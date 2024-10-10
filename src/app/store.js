import { configureStore } from "@reduxjs/toolkit";
import cart from "../features/cart/cartSlice";
import login from "../features/login/loginSlice";
import home from "../features/home/homeSlice";
import productDetails from "../features/product_details/productDetailsSlice";
import register from "../features/register/registerSlice";
import navbar from "../features/navbar/navbarSlice";
const store = configureStore({
  reducer: {
    login,
    register,
    productDetails,
    cart,
    home,
    navbar,
  },
});

export default store;
