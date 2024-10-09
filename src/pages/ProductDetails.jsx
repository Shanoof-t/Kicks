import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartProvider";
import { useDispatch, useSelector } from "react-redux";
import { setSizeError } from "../features/product_details/productDetailsSlice";
import { updateCartSize } from "../features/product_details/productDetailsAPI";
import { fetchCartItems } from "../features/cart/cartAPI";
function ProductDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const UpdateCartError = useSelector(
    (state) => state.productDetails.error.updateError
  );
  const { productId } = useParams();
  const [items, setItems] = useState({});
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState(0);
  const sizeError = useSelector(
    (state) => state.productDetails.error.sizeError
  );
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("userId");
    setUser(user);
  }, []);
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/items?id=${productId}`)
      .then((res) => {
        if (res.data.length > 0) {
          setItems(res.data[0]);
          setSizes(res.data[0].available_sizes);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [productId]);

  const handleCart = () => {
    if (!user) {
      navigate("/login");
    }
    const cartData = [
      {
        id: items.id,
        name: items.name,
        imageURL: items.imageURL,
        price: items.price,
        quantity: 1,
        size: size,
      },
    ];
    size === 0
      ? dispatch(setSizeError("Choose shoe size"))
      : dispatch(updateCartSize({ user, cartItems, cartData })).then(() => {
          dispatch(fetchCartItems(user)).then(() => {
            if (!UpdateCartError) {
              toast.success("Product added to cart", { className: "mt-12" });
            }
          });
        });

    // : axios
    //     .get(`http://localhost:4000/user/${user}`)
    //     .then((res) => {
    //       const existingCart = res.data.cart || [];
    //       const updatedCart = [...existingCart, ...cartItems];
    //       axios.patch(`http://localhost:4000/user/${user}`, {
    //         cart: updatedCart,
    //       });
    //       setCartItems(updatedCart);
    //     })
    //     .then(() => {
    //       toast.success("Product added to cart", { className: "mt-12" });
    //     })
    //     .catch((err) => {
    //       toast.error(err.message, { className: "mt-12" });
    //     });
    if (size > 0) {
      dispatch(setSizeError(""));
    }
    if (UpdateCartError) {
      toast.error(UpdateCartError, { className: "mt-12" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto flex p-4 sm:p-6 lg:p-8">
        <div className="md:flex justify-evenly md:space-x-6">
          <div className="md:w-2/4  mb-6 md:mb-0">
            <img
              src={items.imageURL}
              alt={items.name}
              className="w-full h-4/5 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {items.name}
            </h1>
            <h5 className="text-xl text-blueColor font-bold mb-4">
              ${items.price}.00
            </h5>
            <div className="mb-4">
              <h5 className="text-lg font-bold mb-2">Size</h5>
              <div className="flex flex-wrap gap-2 mb-4">
                {sizes.map((value, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg text-white font-bold ${
                      size === value
                        ? "bg-thirdColor"
                        : "bg-sizeColor  hover:bg-hoverColor"
                    } shadow-md transition-transform transform hover:scale-105`}
                    onClick={() => setSize(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              {sizeError && <p className="text-red-500 mt-2">{sizeError}</p>}
            </div>
            <div className="mb-4">
              <button
                className="bg-thirdColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                onClick={handleCart}
              >
                ADD TO CART
              </button>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-2">ABOUT THE PRODUCT</h5>
              <p className="text-gray-700">{items.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
