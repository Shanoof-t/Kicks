import React, { createContext, useEffect, useState } from "react";
import { userURL } from "../API/API_URL";
import axios from "axios";
export const UserContext = createContext();
function UserProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(userURL)
      .then((res) => {
        const allOrders = res.data
          .filter((value) => !value.isAdmin && value.order)
          .flatMap((value) => value.order);
        setOrders(allOrders);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios.get(userURL).then((res) => {
      const allUsers = res.data.filter(value=>!value.isAdmin)
      setUsers(allUsers);
    });
  }, []);
  return (
    <UserContext.Provider value={{ orders, users }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
