import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "./firebase/config";
import { doc, setDoc } from "firebase/firestore";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //   username: username,
    //   name: name,
    //   email: user.email,
    // });
    let auth = getAuth(app);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      createUserProfile(user, username);

      console.log(response.user);
      localStorage.setItem("userId", response.user.uid);
    } catch (error) {
      console.error(error);
    }
  };

  const createUserProfile = (user, username) => {
    const userDocRef = doc(db, "users", user.uid);
    console.log({
      username: username,
      id: user.uid,
      email: user.email,
    });
    const userProfileData = {
      username: username,
      id: user.uid,
      email: user.email,
    };

    setDoc(userDocRef, userProfileData)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error("Error Creating user Profile", error);
      });
  };
  return (
    <div className="flex w-full min-h-screen bg-white">
      <Link
        to="/"
        className="min-h-screen w-[30%] hidden md:flex items-center justify-center bg-gray-100"
      >
        <img src={logo} alt="Logo" className="w-40" />
      </Link>
      <div className="xsm:w-full md:m-20 xsm:p-5 md:w-[70%] flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center mt-[60px] mb-2 text-gray-800">
          <span className="text-sm font-semibold">Sign Up</span>
          <span className="text-2xl font-bold tracking-wide">
            InvoiceXpress
          </span>
        </div>
        <form
          className="xsm:w-full md:w-3/5 mt-4 md:mt-10 flex flex-col gap-6 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="  text-xs text-gray-600">Username</label>
            <input
              type="text"
              className="form-control input-text w-full bg-gray-50 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="  text-xs text-gray-600">Email</label>
            <input
              type="email"
              className="form-control input-text w-full bg-gray-50 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="  text-xs text-gray-600">Password</label>
            <input
              type="password"
              className="form-control input-text w-full bg-gray-50 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="  text-xs text-gray-600">Confirm Password</label>
            <input
              type="password"
              className="form-control input-text w-full bg-gray-50 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 focus:scale-95 duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="md:my-[60px] my-4 text-gray-600">
          <span className="suggest-des text-xs">
            Already have an account?
            <Link
              to="/login"
              className="link-action text-blue-500 underline ml-2 hover:text-blue-600 transition-all duration-200"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
