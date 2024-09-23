import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemDisplay from "../components/ItemDisplay";

function AllItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return <ItemDisplay value={items} />;
}

export default AllItems;
