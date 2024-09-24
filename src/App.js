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
import EditProduct from "./admin/EditProduct";
function App() {
  const location = useLocation();
  const hideComponent =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  const hideHeaderDash =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <ProductProvider>
      <div className={hideComponent ? "" : "container mx-auto"}>
        {!hideHeaderDash && hideComponent && <HeaderDash />}
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
            <Route path="admin/editproduct/:itemId" element={<EditProduct />} />
          </Routes>
        </div>
        {!hideComponent && <Footer />}
      </div>
    </ProductProvider>
  );
}

export default App;
