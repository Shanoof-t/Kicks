import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductContext } from "../../context/ProductProvider";
import axios from "axios";
import { userURL } from "../../API/API_URL";

const HeaderDash = () => {
  const navigate = useNavigate();
  const { allitems } = useContext(ProductContext);
  // const [admin, setAdmin] = useState(false);
  // const id = localStorage.getItem("adminId");
  const admin = localStorage.getItem("isAdmin");

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // useEffect(() => {
  //   axios
  //     .get(`${userURL}/${id}`)
  //     .then((res) => {
  //       if (res.data?.isAdmin) {
  //         setAdmin(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, [id]);

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-700 mt-2">
            You don't have permission to access this page.
          </p>
          <button
            className="px-4 py-2 mt-5 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition duration-200"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (admin) {
    return (
      <div className="flex h-screen">
        <div className=" bg-white shadow-lg flex flex-col py-6 px-4">
          {/* Logo Section */}
          <div className="mb-10 flex justify-center">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          {/* Button Section */}
          <div className="space-y-4 flex-grow">
            <button
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/admin")}
            >
              <h1 className="text-sm font-semibold uppercase">Dashboard</h1>
            </button>
            <button
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
              onClick={() => handleCategory("allitems")}
            >
              <h1 className="text-sm font-semibold uppercase">All Products</h1>
            </button>
            <button
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("orderlist")}
            >
              <h1 className="text-sm font-semibold uppercase">Order List</h1>
            </button>
            <button
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("users")}
            >
              <h1 className="text-sm font-semibold uppercase">Users</h1>
            </button>

            {/* Category Section */}
            <div className="mt-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleCategory}
              >
                <h1 className="text-sm font-semibold text-gray-700">
                  Category
                </h1>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${
                    categoryShow ? "rotate-180" : ""
                  }`}
                />
              </div>

              {categoryShow && (
                <div className="space-y-2 mt-2">
                  <div
                    className="flex justify-between cursor-pointer py-1"
                    onClick={() => handleCategory("CASUAL")}
                  >
                    <h1 className="text-sm text-gray-600">Casual</h1>
                    <span className="text-gray-600">
                      {casualFiltered.length}
                    </span>
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
              className="flex items-center justify-center w-full px-4 py-3 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200"
              onClick={handleLogout}
            >
              <h1 className="text-sm font-semibold uppercase">Logout</h1>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-8">
          <Outlet />
        </div>
      </div>
    );
  }

  return null;
};

export default HeaderDash;
