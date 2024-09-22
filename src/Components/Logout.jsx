import React from "react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {
  const handleLogOut = () => {};
  return (
    <div
      onClick={handleLogOut}
      className="flex justify-center  text-xs text-[14px] bg-red-600 items-center  py-2 px-4 rounded-lg btn hover:bg-red-700 transition-all ease-in-out text-white"
    >
      <FontAwesomeIcon icon={faSignOut} className="me-2 text-[14px]" />
      Logout
    </div>
  );
};

export default Logout;
