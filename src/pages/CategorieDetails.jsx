import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemDisplay from "../components/ItemDisplay";
function CategorieDetails() {
  const { categrieType } = useParams();
  const { categorieGender } = useOutletContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/items?category=${categrieType}&gender=${categorieGender}`
      )
      .then((res) => {
        setItems(res.data);
      });
  }, [categrieType, categorieGender]);

  return <ItemDisplay value={items} gender={categorieGender} type={categrieType}/>;
}

export default CategorieDetails;
