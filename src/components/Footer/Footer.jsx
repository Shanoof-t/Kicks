import React from "react";
import logowhite from "../../assets/logo/Logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <footer className="bg-thirdColor text-white pt-8 md:pt-12 md:px-12 px-4 my-12 rounded-3xl ">
        <div className="flex flex-wrap justify-between gap-32">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-secondaryColor">
              About Us
            </h2>
            <p>
              We are the biggest hyperstore in the universe. <br /> We got you
              covered with our exclusive <br /> collections and latest drops.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-secondaryColor">
              Categories
            </h2>
            <ul>
              <Link to={"/categorie/MEN"}>
                <li className="mb-2">Men</li>
              </Link>
              <Link to={"/categorie/WOMEN"}>
                <li className="mb-2">Women</li>
              </Link>
              <Link to={"/categorie/KIDS"}>
                <li className="mb-2">Kids</li>
              </Link>
              
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-secondaryColor">
              Company
            </h2>
            <ul>
              <li className="mb-2">About</li>
              <li className="mb-2">Contact</li>
              <li className="mb-2">Blogs</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-secondaryColor">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-blue-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-pink-500 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <img src={logowhite} alt="" />
        </div>
      </footer>
    </>
  );
}

export default Footer;
