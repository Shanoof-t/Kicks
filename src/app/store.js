import { configureStore } from "@reduxjs/toolkit";
import cart from "../features/cart/cartSlice";
import login from "../features/login/loginSlice";
import home from "../features/home/homeSlice";
import productDetails from "../features/product_details/productDetailsSlice";
import register from "../features/register/registerSlice";
import navbar from "../features/navbar/navbarSlice";
import checkout from "../features/checkout/checkoutSlice";
import displayItem from "../features/displayItem/displayItemSlice";
import categorie from "../features/Categorie/categorieSlice";
import categorieDetails from "../features/categorie_details/categorieDetailsSlice";
import allProducts from "../features/common/allProducts/allProductsSlice";
import orderDetails from "../features/order_details/orderDetailsSlice";
const store = configureStore({
  reducer: {
    login,
    register,
    productDetails,
    cart,
    home,
    navbar,
    checkout,
    displayItem,
    categorie,
    categorieDetails,
    allProducts,
    orderDetails,
  },
});

export default store;
