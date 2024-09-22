import React, { useState } from "react";
import logo from "../assets/mob-logo.svg";
const CreateProfile = () => {
  //   const [selectedImage, setSelectedImage] = useState(null);

  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];

  //     if (file) {
  // Display the selected image
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         setSelectedImage(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plan, setPlan] = useState("");

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePlan = (e) => {
    setPlan(e.target.value);
  };
  // let company_name = localStorage.getItem('company_name');
  let username = localStorage.getItem("username");
  let email = localStorage.getItem("email");
  let password = localStorage.getItem("password");

  const handleCreate = () => {
    // console.log(`Creating a new Company with name: ${companyName}`);
  };
  return (
    <div className="flex w-full ">
      <div className="xsm:w-full md:m-20 mb-0 xsm:p-5 md:w-[100%] flex flex-col items-center mt-0 ">
        <div className="flex self-start">
          <img src={logo} className="" />
        </div>
        <div className="flex  flex-col gap-4 items-center  mb-0">
          <span className="description">Set up your profile</span>
        </div>
        <form className="xsm:w-full md:w-3/5 mt-16 flex flex-col gap-3 md:gap-10 items-center justify-center">
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Company&apos;s Name </span>
            <input
              type="text"
              className="form-control input-text"
              value={companyName}
              onChange={handleCompanyName}
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Address</span>
            <input
              type="text"
              className="form-control input-text"
              value={address}
              onChange={handleAddress}
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Phone Number</span>
            <input
              type="number"
              className="form-control input-text"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
          </div>
          <div className="w-full flex flex-col gap-4 text-start input-name">
            <label htmlFor="plan">Select your plan</label>
            <select
              id="plan"
              value={plan}
              onChange={handlePlan}
              className="w-full form-control"
            >
              <option value="Plan 1">Plan 1</option>
              <option value="Plan 2">Plan 2</option>
              <option value="Plan 3">Plan 3</option>
            </select>
          </div>
          <button onClick={handleCreate} className="action-btn my-[12px]">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
