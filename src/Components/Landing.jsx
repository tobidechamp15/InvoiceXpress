import React from "react";
import logo from "../assets/logo.svg";
import ham from "../assets/hamburger.svg";
import Home from "./Home";
import Join from "./Join";
// import Purpose from "./Purpose";

const Landing = () => (
  <div className="">
    <div className="container bg-[#1E1B18] text-white pb-11 h-full justify-center items-center">
      <div className="flex md:justify-around  justify-between  items-center py-2 md:py-[67px]">
        <span>
          <img src={logo} className="xsm:w-[80px] xsm:h-[64px]" />
        </span>
        <img className="flex  md:hidden" src={ham} alt="" />
        <div className="md:flex py-[14px] px-[48px] hidden bg-[#FFFAFF] rounded-[50px] gap-[15px] justify-center items-center">
          <span className="nav-item">Home</span>
          <span className="nav-item">About</span>
          <span className="nav-item">Pricing</span>
          <span className="nav-item">FAQs</span>
          <span className="nav-item">Contact</span>
          <span className="text-[#fff] text-[15px] font-bold bg-[#0000FE] rounded-[30px] py-[16px] px-[42px] cursor-pointer">
            Get Started
          </span>
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
