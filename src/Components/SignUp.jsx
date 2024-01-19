import React, { useState } from "react";
import logo from "../assets/mob-logo.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  console.log({
    username: username,
    email: email,
    password: password,
    confirm_password: confirmPassword,
  });
  const storeValuesInLocalStorage = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        email: email,
        password: password,
      })
    );
  };

  //   if (confirmPassword === password) {

  //   }

  return (
    <div className="flex w-full ">
      <div className="xsm:w-full md:mx-20 mb-0 xsm:px-5 md:w-[100%] flex flex-col items-center mt-0 ">
        <div className="flex self-start">
          <img src={logo} className="" />
        </div>
        <div className="flex  flex-col gap-4 items-center mt-[23px] mb-0">
          <span className="description">Sign up </span>
          {/* <span className="name">InvoiceXpress</span> */}
        </div>
        <form className="xsm:w-full md:w-3/5 mt-4 md:mt-16 flex flex-col md:gap-12 gap-4 items-center justify-center">
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Username</span>
            <input
              type="text"
              className="form-control input-text"
              value={username}
              onChange={handleUsername}
            />
          </div>
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
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Confirm Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </div>
          <button onClick={storeValuesInLocalStorage} className="action-btn">
            <Link to="/get-started/create-profile">Sign Up</Link>
          </button>
        </form>
        {/* <div className="flex gap-4 md:w-3/5  border-white border-2 w-full text-white item-center p-3 my-5  rounded-[9995px] justify-center">
          <img src={google} alt="" />
          <span>Sign in with Google</span>
        </div> */}
        <div className="md:my-[74px] my-4">
          <span className="suggest-des">
            Already have an account?
            <Link to="/login" className="link-action ms-2">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
