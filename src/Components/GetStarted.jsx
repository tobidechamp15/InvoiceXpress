import React from "react";
import logo from "../assets/logo.svg";
import { Link, Outlet, NavLink } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="flex w-full ">
      <Link
        to="/"
        className="h-screen w-[30%]  items-center justify-center bg-side hidden md:flex"
      >
        <img src={logo} alt="" />
      </Link>
      <div className="xsm:w-full min-h-[100vh] md:m-20 mb-0 xsm:p-5 md:w-[70%] flex flex-col items-center mt-0 ">
        <Outlet />
        <div className="w-full flex justify-between text-white py-5">
          <NavLink to="/get-started/signUp">Back</NavLink>
          <NavLink to="/get-started/create-profile">Next</NavLink>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
