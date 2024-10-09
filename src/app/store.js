import { configureStore } from "@reduxjs/toolkit";
import cart from "../features/cart/cartSlice";
import login from "../features/login/loginSlice";
import productDetails from "../features/product_details/productDetailsSlice";
const store = configureStore({
  reducer: {
    cart,
    login,
    productDetails,
  },
});

export default store;
