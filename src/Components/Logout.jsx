import React from "react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const Logout = () => {
  const handleLogOut = () => {
    axiosInstance
      .post("logout", {}, { headers })
      .then((response) => {
        console.log(response.data);
        const successMessage = response.data;
        if (successMessage.success) {
          window.location.href = "/";
          localStorage.removeItem("userToken");
          localStorage.removeItem("userID");
        }
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  return (
    <div
      onClick={handleLogOut}
      className="flex justify-center  text-xs md:text-xl bg-pink-600 items-center w-full py-2 px-4 rounded-lg btn hover:bg-pink-700 transition-all ease-in-out text-white"
    >
      <FontAwesomeIcon icon={faSignOut} className="me-2" />
      Logout
    </div>
  );
};

export default Logout;
