import React, { useState } from "react";

function AddProduct() {
  const initialInformation = {
    name: "",
    description: "",
    category: "",
    brand: "",
    gender: "",
    items_left: "",
    available_sizes: [],
    price: "",
    offer_price: "",
    imageURL: "",
  };
  const [productData, setProductData] = useState(initialInformation);
  const [group, setGroup] = useState("");
  console.log(productData);

  const handleAddProduct = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleGroup = (group) => {
    setGroup(group);
    setProductData(prev=>{
        return {...prev,gender:group}
    })
  };
  return (
    <div className="ms-64 p-8">
      <form action="" onSubmit={handleAddProduct}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Product Details</h1>
        </div>
        <div className="flex justify-evenly">
          <div className="w-1/2 p-4">
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Product Name</h2>
              <input
                type="text"
                placeholder="Type name here"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                name="name"
                value={productData.name}
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Description</h2>
              <input
                type="text"
                placeholder="Type description here"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                name="description"
                value={productData.description}
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Category</h2>
              <input
                type="text"
                placeholder="Type category here"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                name="category"
                value={productData.category}
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Brand Name</h2>
              <input
                type="text"
                placeholder="Type brand name here"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                name="brand"
                value={productData.brand}
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Select Group</h2>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={handleGroup("MEN")}
                    checked={group === "MEN"}
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={handleGroup("FEMALE")}
                    checked={group === "FEMALE"}
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" 
                  onChange={handleGroup("KIDS")}
                  checked={group === "KIDS"}
                  />
                  Kids
                </label>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Stock Quantity</h2>
              <input
                type="number"
                placeholder="Enter quantity here"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">
                Sizes{" "}
                <span className="text-sm text-gray-500">
                  (Enter sizes with ",")
                </span>
              </h2>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter sizes here"
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Regular Price</h2>
              <input
                type="number"
                placeholder="Enter regular price here"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Sale Price</h2>
              <input
                type="number"
                placeholder="Enter sale price here"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Preview</h2>
              <div>
                <img
                  src=""
                  alt="Preview"
                  className="w-full h-40 border border-gray-300 rounded-md object-cover"
                />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Add Image</h2>
              <div className="border-dashed border-4 border-gray-400 p-8 text-center mb-4 cursor-pointer">
                <p>Drop your image here</p>
              </div>
              <h2 className="text-center mb-2">OR</h2>
              <h2 className="font-semibold mb-1">Image URL</h2>
              <input
                type="text"
                placeholder="Type image URL here"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
