import React, { useContext, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import dashlog from "../../assets/icons/dashboard.png";
import { useNavigate } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductContext } from "../../context/ProductProvider";

const HeaderDash = () => {
  const navigate = useNavigate();
  const { allitems } = useContext(ProductContext);

  const casualFiltered = allitems.filter((value) => value.category === "CASUAL");
  const footballFiltered = allitems.filter((value) => value.category === "FOOTBALL");
  const runningFiltered = allitems.filter((value) => value.category === "RUNNING");

  const [categoryShow, setCategoryShow] = useState(false);

  const toggleCategory = () => {
    setCategoryShow(!categoryShow);
  };

  const handleCategory = (type) => {
    navigate(`admin/productlist/${type}`);
  };

  return (
    <div className="flex flex-col h-screen w-64 py-6 px-4 bg-white shadow-md fixed">
      {/* Logo Section */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Button Section */}
      <div className="space-y-4">
        <button
          className="flex items-center w-full px-4 py-3 bg-thirdColor text-white rounded-md shadow hover:bg-thirdColor-dark transition duration-200"
          onClick={() => navigate("admin")}
        >
          <img src={dashlog} alt="Dashboard Icon" className="h-5 w-5 mr-2" />
          <h1 className="text-sm font-semibold uppercase">Dashboard</h1>
        </button>
        <button
          className="w-full px-4 py-3 bg-thirdColor text-white rounded-md shadow hover:bg-thirdColor-dark transition duration-200"
          onClick={() => handleCategory("allitems")}
        >
          <h1 className="text-sm font-semibold uppercase">All Products</h1>
        </button>
      </div>

      {/* Category Section */}
      <div className="mt-10 w-full">
        <div className="flex justify-between cursor-pointer" onClick={toggleCategory}>
          <h1 className="text-sm font-semibold">Category</h1>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>

        {categoryShow && (
          <div className="mt-2 space-y-2">
            <div className="flex justify-between cursor-pointer" onClick={() => handleCategory("CASUAL")}>
              <h1 className="text-sm">Casual</h1>
              <span>{casualFiltered.length}</span>
            </div>
            <div className="flex justify-between cursor-pointer" onClick={() => handleCategory("FOOTBALL")}>
              <h1 className="text-sm">Football</h1>
              <span>{footballFiltered.length}</span>
            </div>
            <div className="flex justify-between cursor-pointer" onClick={() => handleCategory("RUNNING")}>
              <h1 className="text-sm">Running</h1>
              <span>{runningFiltered.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDash;
