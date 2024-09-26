import React, { createContext, useEffect, useState } from "react";
import { userURL } from "../API/API_URL";
import axios from "axios";
export const UserContext = createContext();
function UserProvider({ children }) {
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(userURL)
      .then((res) => {
        const allOrders = users
      .filter((value) => !value.isAdmin && value.order)
      .flatMap((value) => value.order);
    setAllOrders(allOrders);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios.get(userURL).then((res) => {
      const allUsers = res.data.filter((value) => !value.isAdmin);
      setUsers(allUsers);
    });
  }, []);
  return (
    <UserContext.Provider value={{  users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
