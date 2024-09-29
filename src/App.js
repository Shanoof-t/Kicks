import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
import Categorie from "./pages/Categorie";
import AllItems from "./pages/AllItems";
import CategorieDetails from "./pages/CategorieDetails";
import ItemDisplay from "./components/ItemDisplay";
import AddProduct from "./admin/AddProduct";
import DashboardHome from "./admin/DashboardHome";
import ProductProvider from "./context/ProductProvider";
import ProductsDash from "./admin/ProductsDash";
import UpdateProduct from "./admin/UpdateProduct";
import Users from "./admin/Users";
import OrderList from "./admin/OrderList";
import Order from "./admin/Order";
import UserProvider from "./context/UserProvider";
import UserProfile from "./admin/UserProfile";
import CartProvider from "./context/CartProvider";
import React, { Suspense, useEffect } from "react";
import Loading from "./components/Loading";
const Home = React.lazy(() => import("./pages/Home"));
const HeaderDash = React.lazy(() => import("./admin/components/HeaderDash"));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideComponent =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");
  useEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      navigate("/admin");
    }
  }, []);
  return (
    <CartProvider>
      <UserProvider>
        <ProductProvider>
          <div className={hideComponent ? "" : "container mx-auto"}>
            {/* {!hideHeaderDash && hideComponent && <AdminNavbar />} */}
            {!hideComponent && <Navbar />}
            {/* <div className="main"> */}
            <Routes>
              {/* User Routes */}

              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                }
              />
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

              {/* Admin Routes */}

              <Route
                path="admin"
                element={
                  <Suspense fallback={<Loading />}>
                    <HeaderDash />
                  </Suspense>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route
                  path="productlist/:productCategory"
                  element={<ProductsDash />}
                />
                <Route path="addproduct" element={<AddProduct />} />
                <Route
                  path="updateproduct/:itemId"
                  element={<UpdateProduct />}
                />
                <Route path="orderlist" element={<OrderList />} />
                <Route path="order/:orderID" element={<Order />} />
                <Route path="users" element={<Users />} />
                <Route path="userprofile/:userID" element={<UserProfile />} />
              </Route>
            </Routes>
          </div>
          {!hideComponent && <Footer />}
          {/* </div> */}
          {/* <AdminRoutes />
        <UserRoutes /> */}
        </ProductProvider>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
