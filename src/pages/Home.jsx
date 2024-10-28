import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import doitright from "../assets/images/Do it right.png";
import nikeairmax from "../assets/images/new.png";
function Home() {
  const navigate = useNavigate();
  const settings = useSelector((state) => state.home.settings);
  const categories = useSelector((state) => state.home.categories);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 ">
      <div className="text-center mb-8 w-full">
        <img src={doitright} alt="" className="my-12" />
      </div>
      <div className="flex justify-center mb-8 relative">
        <img src={nikeairmax} alt="" />
        <div className="absolute w-2/3 bottom-5 left-2 md:left-10 md:bottom-10 flex flex-col items-start md:space-y-4">
          <h1 className="text-white text-xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            NIKE AIR MAX
          </h1>
          <div className="w-2/3">
            <h5 className="text-white text-sm sm:text-lg md:text-xl font-semibold">
              Nike introducing the new air max for everyone's comfort
            </h5>
          </div>
          <Link to={"product/16"}>
            <button className="bg-thirdColor p-4 md:p-4 font-bold text-xs text-white rounded-xl mt-1">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 md:py-16 ">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-thirdColor">
            CATEGORIES
          </h1>
        </div>

        {/* Category Cards */}
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="p-2 md:p-4 rounded-lg ">
              <img
                className="w-full h-48 md:h-64 object-cover rounded-3xl"
                src={category.image}
                alt={`${category.name}'s Sneakers`}
              />
              <div className="p-2 md:p-4 flex justify-between items-center">
                <h4 className="text-sm md:text-lg font-semibold text-gray-800">
                  {category.name}
                </h4>
                <button
                  className="text-thirdColor hover:text-hoverColor transition duration-300"
                  onClick={() => navigate(`${category.path}`)}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
