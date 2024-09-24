import React, { useContext, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import dashlog from "../../assets/icons/dashboard.png";
import { useNavigate } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductContext } from "../../context/ProductProvider";

const HeaderDash = () => {
  const navigate = useNavigate();
  const handleAllProduct = () => {
    navigate("/productlist");
  };

  const { allitems } = useContext(ProductContext);

  const casualFilltered = allitems.filter(
    (value) => value.category === "CASUAL"
  );

  const footballFilltered = allitems.filter(
    (value) => value.category === "FOOTBALL"
  );
  const runningFilltered = allitems.filter(
    (value) => value.category === "RUNNING"
  );
  const [categoryShow, setCategoryShow] = useState(false);
  const toggleCategory = () => {
    setCategoryShow(!categoryShow);
  };

  const hanleCategory = () =>{
    
  }
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
      <div className="w-full">
        <div
          className="flex justify-between w-full mt-10 "
          onClick={toggleCategory}
        >
          <div>
            <h1>Category</h1>
          </div>
          <div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {categoryShow && (
          <div>
            <div className="flex justify-between w-full" onClick={hanleCategory}>
              <div>
                <h1>Casual</h1>
              </div>
              <div>{casualFilltered.length}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <h1>Football</h1>
              </div>
              <div>{footballFilltered.length}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <h1>Running</h1>
              </div>
              <div>{runningFilltered.length}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDash;
