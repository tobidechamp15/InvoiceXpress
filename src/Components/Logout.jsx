import React from "react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth
// import { useNavigate } from "react-router-dom";

const Logout = () => {
  // const navigate = useNavigate();
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful, you can redirect the user
        console.log("Logged out successfully");
        localStorage.removeItem("userId");
      })
      .catch((error) => {
        // Handle error if sign-out fails
        console.error("Logout error: ", error);
      });
  };

  return (
    <div
      onClick={handleLogOut}
      className="flex justify-center text-xs text-[14px] bg-red-600 items-center py-2 px-4 rounded-lg btn hover:bg-red-700 transition-all ease-in-out text-white"
    >
      <FontAwesomeIcon icon={faSignOut} className="me-2 text-[14px]" />
      Logout
    </div>
  );
};

export default Logout;
