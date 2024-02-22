import React, { useState, useEffect } from "react";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const UpgradeProfile = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAdminRequest = () => {
    axiosInstance
      .post("adminRequest", {}, { headers })
      .then((response) => {
        console.log(response.data);
        setErrorMessage("Your request has been sent");
        setTimeout(() => {
          setErrorMessage(null); // Hide error message after 5 seconds
        }, 2000);
      })
      .catch((err) => {
        console.error(err.response);
        setErrorMessage("You're already an admin");
        setTimeout(() => {
          setErrorMessage(null); // Hide error message after 5 seconds
        }, 2000);
      });
  };
  const getAllUsers = () => {
    const loggedInUser = localStorage.getItem("userID");

    axiosInstance
      .get(`/getUserById/${loggedInUser}`, { headers })
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.log(user);
        console.error(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  });
  return (
    <div className="text-white container-fluid h-min-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Upgrade Profile</span>
        <span
          to="/dashboard/add-products"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Add Products</span>
        </span>
      </div>
      <div
        className={`${
          errorMessage
            ? " transition-all ease-in-out left-0 p-3"
            : "transition-all ease-in-out left-full "
        } flex rounded-lg my-2 absolute  w- ms-[265px] me-[10px]  w-auto bg-[#fff] text-[#0066ff]`}
      >
        {errorMessage}
      </div>
      <div className="my-2 flex items-center justify-between p-2">
        <span className="text-lg font-bold  my-3">Become an Admin </span>
        <span
          onClick={handleAdminRequest}
          className="btn btn-outline-primary h-fit w-fit text-white"
        >
          Request
        </span>
      </div>

      <div>
        {user.role === "admin"
          ? "You are an admin already"
          : "You are not an admin"}
      </div>
    </div>
  );
};

export default UpgradeProfile;
