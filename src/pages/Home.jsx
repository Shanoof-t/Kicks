import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:false,
    nextArrow: (
      <button className="bg-gray-300 p-2 md:p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-gray-700 text-lg md:text-xl"
        />
      </button>
    ),
    prevArrow: (
      <button className="bg-gray-300 p-2 md:p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-gray-700 text-lg md:text-xl"
        />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const categories = [
    {
      path: "men",
      name: "Men",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b8f2b4d5-1240-4a80-aa73-7a3b3509fba6/AIR+DT+MAX+%2796.png",
    },
    {
      path: "women",
      name: "Women",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fdb1586-7439-46ee-8aaf-7d654beb0f5c/W+NIKE+CORTEZ+VNTG.png",
    },
    {
      path: "kids",
      name: "Kids",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3e6a746d-d11d-44bb-813b-0a93407bc667/NIKE+AIR+MORE+UPTEMPO+%28GS%29.png",
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl mt-10 sm:text-6xl md:text-8xl lg:text-9xl font-bold text-thirdColor">
          DO IT <span className="text-blueColor">RIGHT</span>
        </h1>
      </div>
      <div className="flex justify-center mb-8 relative">
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2023/3/295617428/WL/RL/XG/80392428/maksim-larin-nopsc3nwtzy-unsplash-1000x1000.jpg"
          alt="Main Banner"
          className="w-full max-w-9xl rounded-3xl object-cover " // Ensures it maintains aspect ratio
        />
        <div className="absolute bottom-5 left-2 md:left-10 md:bottom-10 flex flex-col items-start md:space-y-4">
          <h1 className="text-white text-xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            NIKE AIR MAX
          </h1>
          <div className="w-2/3">
            <h5 className="text-white text-sm sm:text-lg md:text-xl font-semibold">
              Nike introducing the new air max for everyone's comfort
            </h5>
          </div>
          <Link to={"kids/16"}>
            <button className="bg-thirdColor p-4 md:p-4 font-bold text-xs text-white rounded-xl mt-1">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 md:py-16">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-thirdColor">
            CATEGORIES
          </h1>
        </div>

        {/* Category Cards */}
        <Slider {...settings} >
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
