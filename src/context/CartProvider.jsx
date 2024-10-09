import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:4000/user/${user}`)
        .then((res) => {
          const cart = res.data.cart;
          setCartItems(cart);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user])
  return (
    <CartContext.Provider value={{ cartItems, setUser, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
