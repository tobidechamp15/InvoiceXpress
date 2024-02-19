import React from "react";
import { useState } from "react";
import logo from "../assets/mob-logo.svg";
import { Link } from "react-router-dom";
import axiosInstance from "./axios/axios";

const SetUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const [createProfile, setCreateProfile] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  //   const handleConfirmPassword = (e) => {
  // setConfirmPassword(e.target.value);
  //   };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [plan, setPlan] = useState("");

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNo(e.target.value);
  };
  const handlePlan = (e) => {
    setPlan(e.target.value);
  };
  // let company_name = localStorage.getItem('company_name');
  // let username = localStorage.getItem("username");
  // let email = localStorage.getItem("email");
  // let password = localStorage.getItem("password");

  const handleCreate = (e) => {
    e.preventDefault();
    console.log({
      username,
      email,
      password,
      companyName,
      plan,
      address,
      phoneNo,
    });
    // console.log(`Creating a new Company with name: ${companyName}`);
    axiosInstance
      .post("/signup", {
        username,
        email,
        password,
        companyName,
        plan,
        address,
        phoneNo,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error.message);
      });
  };
  return (
    <div className="xsm:min-h-[100vh] flex md:w-full">
      <Link
        to="/"
        className="h-screen w-[30%]  items-center justify-center bg-side hidden md:flex"
      >
        <img src={logo} alt="" />
      </Link>
      <div className="md:w-[70%] w-full">
        <div className="flex  flex-col gap-4 items-center mt-[76px] mb-0">
          {/* <span className="description">Sign in to</span> */}
          <span className="name">InvoiceXpress</span>
        </div>
        {createProfile ? (
          <div className="flex w-full ">
            <div className="xsm:w-full md:mx-20 mb-0 xsm:px-5 md:w-[100%] flex flex-col items-center mt-0 ">
              {/* <div className="flex self-start">
                <img src={logo} className="" />
              </div> */}
              <div className="flex  flex-col gap-4 items-center mt-[23px] mb-0">
                <span className="description">Sign up </span>
              </div>
              <form className="xsm:w-full md:w-3/5 mt-4 md:mt-16 flex flex-col md:gap-12 gap-4 items-center justify-center">
                <div className=" flex-col flex gap-4 items-start w-full">
                  <span className="input-name">Username</span>
                  <input
                    required
                    type="text"
                    className="form-control input-text"
                    value={username}
                    onChange={handleUsername}
                  />
                </div>
                <div className=" flex-col flex gap-4 items-start w-full">
                  <span className="input-name">Email</span>
                  <input
                    required
                    type="email"
                    className="form-control input-text"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div className=" flex-col flex gap-4 items-start w-full">
                  <span className="input-name">Password</span>
                  <input
                    required
                    type="password"
                    className="form-control input-text"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
              </form>

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
        ) : (
          <div className=" w-full flex flex-col ">
            <div className="xsm:w-full  mb-0 xsm:p-5 md:w-[100%] flex flex-col items-center mt-0    ">
              {/* <div className="flex self-start md:hidden">
                <img src={logo} className="" />
              </div> */}
              <div className="flex  flex-col gap-4 items-center  mb-0">
                <span className="description">Set up your profile</span>
              </div>
              <form className="xsm:w-full md:w-3/5 mt-16 flex flex-col xsm:gap-3 md:gap-10 items-center justify-center">
                <div className=" flex-col flex gap-4 items-start w-full">
                  <span className="input-name">Company&apos;s Name </span>
                  <input
                    required
                    type="text"
                    className="form-control input-text"
                    value={companyName}
                    onChange={handleCompanyName}
                  />
                </div>
                <div className=" flex-col flex gap-4 items-start w-full">
                  <span className="input-name">Address</span>
                  <input
                    required
                    type="text"
                    className="form-control input-text"
                    value={address}
                    onChange={handleAddress}
                  />
                </div>
                <div className=" flex-col flex gap-4 items-start w-full">
                  <span className="input-name">Phone Number</span>
                  <input
                    required
                    type="number"
                    className="form-control input-text"
                    value={phoneNo}
                    onChange={handlePhoneNumber}
                  />
                </div>
                <div className="w-full flex flex-col gap-4 text-start input-name">
                  <label htmlFor="plan">Select your plan</label>
                  <select
                    required
                    id="plan"
                    value={plan}
                    onChange={handlePlan}
                    className="w-full form-control"
                  >
                    <option value="">Select your plan</option>
                    <option value="Plan1">Plan 1</option>
                    <option value="Plan2">Plan 2</option>
                    <option value="Plan3">Plan 3</option>
                  </select>
                </div>
                <button
                  onClick={handleCreate}
                  type="submit"
                  className="action-btn my-[12px]"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="w-full flex justify-around">
          <button
            className="text-white p-2"
            onClick={() => setCreateProfile(true)}
          >
            Prev
          </button>
          <button
            className="text-white p-2"
            onClick={() => setCreateProfile(false)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetUp;
