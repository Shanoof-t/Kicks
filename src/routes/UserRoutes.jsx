import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Categorie from "../pages/Categorie";
import CategorieDetails from "../pages/CategorieDetails";
import ItemDisplay from "../components/ItemDisplay";
import AllItems from "../pages/AllItems";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import OrderDetails from "../pages/OrderDetails";
import NotFound from "../pages/NotFound";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function UserRoutes() {
  const location = useLocation();
  const hideComponent =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="container mx-auto">
      {!hideComponent && <Navbar />}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="categorie/:categorieGender" element={<Categorie />}>
            <Route path=":categrieType" element={<CategorieDetails />}>
              <Route index element={<ItemDisplay />} />
            </Route>
          </Route>
          <Route path="all" element={<AllItems />} />
          <Route path="men/:productId" element={<ProductDetails />} />
          <Route path="women/:productId" element={<ProductDetails />} />
          <Route path="kids/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orderdetails" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideComponent && <Footer />}
    </div>
  );
}

export default UserRoutes;
