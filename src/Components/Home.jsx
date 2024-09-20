import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero image.svg";

const Home = () => {
  return (
    <div className="flex mt-8 xsm:flex-col-reverse px-4 md:px-8 lg:px-16">
      {/* Left Section - Text Content */}
      <div className="flex flex-col justify-center items-center md:items-start md:w-1/2 gap-6 md:gap-4 text-center md:text-left">
        {/* Main Heading */}
        <h1 className="text-[20px] md:text-[36px] lg:text-[48px] font-bold leading-tight animate-fade-in">
          Receipt Made
          <span className="text-[#D8315B]"> Effortless</span>
          <br />
          with <span className="text-[#0000FE]">InvoiceXpress</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] md:text-[20px] lg:text-[22px] text-[#6D6D6D] font-medium animate-slide-up">
          Generate, Organize, and Share Professional Receipts in a Snap!
        </p>

        {/* Action Buttons */}
        <div className="flex gap-5 mt-4 animate-">
          <Link
            to="/login"
            className="login-btn transition-transform duration-300 ease-in-out transform hover:scale-105 xsm:text-[12px] md:text-[16px] px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/setUp"
            className=" transition-transform duration-300 ease-in-out transform hover:scale-105 xsm:text-[12px] md:text-[16px] px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex items-center justify-center md:w-1/2 mt-8 md:mt-0 animate-fade-in-delayed">
        <img src={heroImg} alt="Hero" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Home;
