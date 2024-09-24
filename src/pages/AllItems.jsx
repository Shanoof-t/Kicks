import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import ItemDisplay from "../components/ItemDisplay";
import { ProductContext } from "../context/ProductProvider";
function AllItems() {
  const {allitems}=useContext(ProductContext)
  return <ItemDisplay value={allitems} />;
}

export default AllItems;
