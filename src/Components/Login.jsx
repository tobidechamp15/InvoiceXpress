import React, { useState } from "react";
import logo from "../assets/logo.svg";
import google from "../assets/google.svg";
import { Link } from "react-router-dom";
import axiosInstance from "./axios/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
    axiosInstance
      .post("/signIn", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex w-full xsm:h-screen">
      <Link
        to="/"
        className="h-screen w-[30%]  items-center justify-center bg-side hidden md:flex"
      >
        <img src={logo} alt="" />
      </Link>
      <div className="xsm:w-full md:m-20 mb-0 xsm:p-5 md:w-[70%] flex flex-col items-center mt-0 ">
        <div className="flex  flex-col gap-4 items-center mt-[76px] mb-0">
          <span className="description">Sign in to</span>
          <span className="name">InvoiceXpress</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="xsm:w-full md:w-3/5 mt-16 flex flex-col gap-12 items-center justify-center"
        >
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Email</span>
            <input
              type="email"
              className="form-control input-text"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button type="submit" className="action-btn">
            Login
          </button>
        </form>
        <div className="flex gap-4 md:w-3/5  border-white border-2 w-full text-white item-center p-3 my-5  rounded-[9995px] justify-center">
          <img src={google} alt="" />
          <span>Sign in with Google</span>
        </div>
        <div className="my-4 ">
          <span className="suggest-des">
            Don&apos;t have an account?
            <Link to="/get-started/signUp" className="link-action ms-2">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
