import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import ham from "../assets/hamburger.svg";
import Home from "./Home";
import Join from "./Join";
// import Purpose from "./Purpose";

const Landing = () => (
  <div className="">
    <div className="container min-h-screen bg-[#1E1B18] text-white pb-11  justify-center items-center">
      <div className="flex md:justify-around  justify-between  items-center py-2 md:py-[67px]">
        <Link to="/">
          <img src={logo} className="xsm:w-[80px] xsm:h-[64px]" />
        </Link>
        <img className="flex  md:hidden" src={ham} alt="" />
        <div className="md:flex py-[14px] px-[48px] hidden bg-[#FFFAFF] rounded-[50px] gap-[15px] justify-center items-center">
          <span className="nav-item">Home</span>
          <span className="nav-item">About</span>
          <span className="nav-item">Pricing</span>
          <span className="nav-item">FAQs</span>
          <span className="nav-item">Contact</span>
          <Link
            to="/login"
            className="text-[#fff] text-[15px] font-bold bg-[#0000FE] rounded-[30px] py-[16px] px-[42px] cursor-pointer"
          >
            Get Started
          </Link>
        </div>
        <span className="hidden md:flex"></span>
      </div>
      <Home />
      <Join />
    </div>
    {/* <Purpose /> */}
  </div>
);
export default Landing;
