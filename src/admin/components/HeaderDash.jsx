import React, { useContext, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductContext } from "../../context/ProductProvider";

const HeaderDash = () => {
  const navigate = useNavigate();
  const { allitems } = useContext(ProductContext);

  const casualFiltered = allitems.filter(
    (value) => value.category === "CASUAL"
  );
  const footballFiltered = allitems.filter(
    (value) => value.category === "FOOTBALL"
  );
  const runningFiltered = allitems.filter(
    (value) => value.category === "RUNNING"
  );

  const [categoryShow, setCategoryShow] = useState(false);

  const toggleCategory = () => setCategoryShow(!categoryShow);

  const handleCategory = (type) => {
    navigate(`productlist/${type}`);
  };

  return (
    <div className="flex h-screen py-6 px-4 ">
      <div >
        {/* Logo Section */}
        <div className="mb-10">
          <img src={logo} alt="Logo" className="h-12 mx-auto" />
        </div>

        {/* Button Section */}
        <div className="space-y-4 flex-grow">
          <button
            className="flex items-center w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/admin")}
          >
            <h1 className="text-sm font-semibold uppercase">Dashboard</h1>
          </button>
          <button
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
            onClick={() => handleCategory("allitems")}
          >
            <h1 className="text-sm font-semibold uppercase">All Products</h1>
          </button>
          <button
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("orderlist")}
          >
            <h1 className="text-sm font-semibold uppercase">Order List</h1>
          </button>
          <button
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("users")}
          >
            <h1 className="text-sm font-semibold uppercase">Users</h1>
          </button>
          {/* Category Section */}
          <div className="mt-6">
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={toggleCategory}
            >
              <h1 className="text-sm font-semibold text-gray-700">Category</h1>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  categoryShow ? "rotate-180" : ""
                }`}
              />
            </div>

            {categoryShow && (
              <div className="space-y-2">
                <div
                  className="flex justify-between cursor-pointer py-1"
                  onClick={() => handleCategory("CASUAL")}
                >
                  <h1 className="text-sm text-gray-600">Casual</h1>
                  <span className="text-gray-600">{casualFiltered.length}</span>
                </div>
                <div
                  className="flex justify-between cursor-pointer py-1"
                  onClick={() => handleCategory("FOOTBALL")}
                >
                  <h1 className="text-sm text-gray-600">Football</h1>
                  <span className="text-gray-600">
                    {footballFiltered.length}
                  </span>
                </div>
                <div
                  className="flex justify-between cursor-pointer py-1"
                  onClick={() => handleCategory("RUNNING")}
                >
                  <h1 className="text-sm text-gray-600">Running</h1>
                  <span className="text-gray-600">
                    {runningFiltered.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-10">
          <button
            className="w-full px-4 py-3 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200"
            onClick={() => navigate("")}
          >
            <h1 className="text-sm font-semibold uppercase">Logout</h1>
          </button>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderDash;
