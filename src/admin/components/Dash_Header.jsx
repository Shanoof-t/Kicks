import React from "react";
import logo from "../../assets/logo/Logo.png";
import dashlog from "../../assets/icons/dashboard.png";
import { useNavigate } from "react-router-dom";

const Dash_Header = () => {
  const navigate = useNavigate();
  const handleAllProduct = () => {
    navigate("/productlist");
  };

  return (  
    <div className="flex flex-col h-screen w-64 items-start py-6 px-4 bg-white shadow-md fixed">
      {/* Logo Section */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Button Section */}
      <div className="flex flex-col space-y-4 w-full">
        <button className="flex items-center w-full px-4 py-3 bg-thirdColor text-white rounded-md shadow hover:bg-thirdColor-dark transition duration-200 ease-in-out">
          <img src={dashlog} alt="Dashboard Icon" className="h-5 w-5 mr-2" />
          <h1 className="text-sm font-semibold uppercase">Dashboard</h1>
        </button>
        <button
          className="w-full px-4 py-3 bg-thirdColor text-white rounded-md shadow hover:bg-thirdColor-dark transition duration-200 ease-in-out"
          onClick={handleAllProduct}
        >
          <h1 className="text-sm font-semibold uppercase">All Products</h1>
        </button>
      </div>
    </div>
  );
};

export default Dash_Header;
