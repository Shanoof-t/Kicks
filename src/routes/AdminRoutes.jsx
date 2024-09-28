import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "../admin/DashboardHome";
import ProductsDash from "../admin/ProductsDash";
import AddProduct from "../admin/AddProduct";
import UpdateProduct from "../admin/UpdateProduct";
import OrderList from "../admin/OrderList";
import Order from "../admin/Order";
import Users from "../admin/Users";
import UserProfile from "../admin/UserProfile";
import HeaderDash from "../admin/components/HeaderDash";
import ProtuctedRoute from "../components/ProtuctedRoute";

function AdminRoutes() {
  return (
    <>
      <HeaderDash />
      <Routes>
        <Route
          path="admin"
          element={<ProtuctedRoute element={<DashboardHome />} />}
        />
        <Route
          path="admin/productlist/:productCategory"
          element={<ProductsDash />}
        />
        <Route
          path="admin/addproduct"
          element={<ProtuctedRoute element={<AddProduct />} />}
        />
        <Route
          path="admin/updateproduct/:itemId"
          element={<ProtuctedRoute element={<UpdateProduct />} />}
        />
        <Route
          path="admin/orderlist"
          element={<ProtuctedRoute element={<OrderList />} />}
        />
        <Route
          path="admin/order/:orderID"
          element={<ProtuctedRoute element={<Order />} />}
        />
        <Route
          path="admin/users"
          element={<ProtuctedRoute element={<Users />} />}
        />
        <Route
          path="admin/userprofile/:userID"
          element={<ProtuctedRoute element={<UserProfile />} />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
