import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { itemsURL } from "../API/API_URL";
import { toast, ToastContainer } from "react-toastify";

function ProductsDash() {
  const [menuToggle, setMenuToggle] = useState(null); // Track toggle per product
  const { productCategory } = useParams();
  const navigate = useNavigate();
  const { allitems } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productCategory === "allitems") {
      setProducts(allitems);
    } else if (productCategory === "CASUAL") {
      const casualFiltered = allitems.filter(
        (value) => value.category === productCategory
      );
      setProducts(casualFiltered);
    } else if (productCategory === "FOOTBALL") {
      const footballFiltered = allitems.filter(
        (value) => value.category === productCategory
      );
      setProducts(footballFiltered);
    } else if (productCategory === "RUNNING") {
      const runningFiltered = allitems.filter(
        (value) => value.category === productCategory
      );
      setProducts(runningFiltered);
    }
  }, [productCategory, allitems]);

  const handleDeleteProduct = (id) => {
    axios
      .delete(`${itemsURL}/${id}`)
      .then(() => {
        toast.success("Item deleted")
        setProducts(products.filter((item)=>item.id !== id))
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className=" p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {productCategory === "allitems" ? "ALL" : productCategory} PRODUCTS
        </h1>
        <button
          className="bg-thirdColor text-white py-2 px-4 rounded-lg hover:bg-thirdColor-dark transition-colors"
          onClick={() => navigate("/admin/addproduct")}
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <div
            key={`${item.id}${index}`}
            className="bg-white shadow-md rounded-lg overflow-hidden relative" 
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              className="absolute top-2 right-2 px-2 py-1 bg-slate-100 rounded-md cursor-pointer"
              onClick={() =>
                setMenuToggle(menuToggle === item.id ? null : item.id)
              }
            />

            {menuToggle === item.id && (
              <div className="absolute top-10 right-2 w-32 bg-white border border-gray-200 shadow-md z-10">
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/admin/updateproduct/${item.id}`)}
                >
                  Edit
                </div>
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDeleteProduct(item.id)}
                >
                  Delete
                </div>
              </div>
            )}

            <div>
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="p-4">
              <h1 className="text-lg font-semibold mb-1">{item.name}</h1>
              <h2 className="text-gray-600 mb-1">{item.category}</h2>
              <h3 className="text-xl font-bold text-green-600">
                ${item.price}
              </h3>
              <h3>{item.gender}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsDash;
