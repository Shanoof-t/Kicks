import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
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
import HeaderDash from "./admin/components/HeaderDash";
import ProductProvider from "./context/ProductProvider";
import ProductsDash from "./admin/ProductsDash";
import UpdateProduct from "./admin/UpdateProduct";
import Users from "./admin/Users";
import OrderList from "./admin/OrderList";
import Order from "./admin/Order";
import UserProvider from "./context/UserProvider";
import UserProfile from "./admin/UserProfile";
import AdminNavbar from "./admin/components/AdminNavbar";
function App() {
  const location = useLocation();
  const hideComponent =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  const hideHeaderDash =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <UserProvider>
      <ProductProvider>
        <div className={hideComponent ? "" : "container mx-auto"}>
          {!hideHeaderDash && hideComponent && <HeaderDash />}
          {/* {!hideHeaderDash && hideComponent && <AdminNavbar />} */}
          {!hideComponent && <Navbar />}
          <div className="main">
            <Routes>
              {/* User Routes */}

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

              {/* Admin Routes */}
              
              <Route path="admin" element={<DashboardHome />} />
              <Route
                path="admin/productlist/:productCategory"
                element={<ProductsDash />}
              />
              <Route path="admin/addproduct" element={<AddProduct />} />
              <Route
                path="admin/updateproduct/:itemId"
                element={<UpdateProduct />}
              />
              <Route path="admin/orderlist" element={<OrderList />} />
              <Route path="admin/order/:orderID" element={<Order />} />
              <Route path="admin/users" element={<Users />} />
              <Route
                path="admin/userprofile/:userID"
                element={<UserProfile />}
              />
            </Routes>
          </div>
          {!hideComponent && <Footer />}
        </div>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
