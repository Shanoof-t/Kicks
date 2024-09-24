import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllProductsDash() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="ms-64 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          className="bg-thirdColor text-white py-2 px-4 rounded-lg hover:bg-thirdColor-dark transition-colors"
          onClick={() => navigate("/addproduct")}
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={`${item.id}${index}`}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold mb-1">{item.name}</h1>
              <h2 className="text-gray-600 mb-1">{item.category}</h2>
              <h3 className="text-xl font-bold text-green-600">
                ${item.price}
              </h3>
            </div>
            <div className="flex justify-center pb-4">
              <button className="bg-thirdColor text-white px-8 py-2 rounded-md shadow hover:bg-thirdColor-dark transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProductsDash;