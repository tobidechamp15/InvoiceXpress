import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero image.svg";

const Home = () => {
  return (
    <div className="flex mt-8 xsm:flex-col-reverse px-2 md:px-5">
      <div className="flex xsm:flex-col justify-center items-center flex-col md:w-1/2 gap-4 md:gap-2">
        <div className="flex flex-col  items-center justify-center text-[24px] md:text-[48px] font-bold">
          <span>
            Receipt Made <span className="text-[#D8315B]"> Effortless</span>
          </span>
          <span>
            with <span className="text-[#0000FE]">InvoiceXpress</span>{" "}
          </span>
        </div>
        <div className=" flex flex-col text-[24px   ] text-center text-[#A3A3A3] font-medium w-full">
          <span>Generate, Organize, and Share Professional</span>
          <span>Receipts in a Snap!</span>
        </div>
        <div className="flex gap-5">
          <Link
            to="/login"
            className="login-btn cursor-pointer  xsm:text-[11px]"
          >
            Login
          </Link>
          <span className="sign-up-btn cursor-pointer xsm:text-[11px]">
            Sign Up
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center md:w-1/2">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
