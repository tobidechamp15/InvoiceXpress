import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
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
          <span className="description">Forgot Password</span>
          <span className="name">InvoiceXpress</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="xsm:w-full md:w-3/5 mt-16 flex flex-col gap-12 items-center justify-center"
        >
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Enter your E-mail</span>
            <input
              type="email"
              className="form-control input-text"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>

          <div className="text-red-500 w-full">{error}</div>
          <button type="submit" className="action-btn">
            Submit
          </button>
        </form>
        <div className="my-4 ">
          <span className="suggest-des">
            Don&apos;t have an account?
            <Link to="/setUp" className="link-action ms-2">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
