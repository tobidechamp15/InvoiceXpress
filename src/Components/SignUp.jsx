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
    <div className="flex w-full ">
      <Link
        to="/"
        className="min-h-screen w-[30%]  items-center justify-center bg-side hidden md:flex"
      >
        <img src={logo} alt="" />
      </Link>
      <div className="xsm:w-full md:m-20 mb-0 xsm:p-5 md:w-[70%] flex flex-col items-center mt-0 ">
        <div className="flex  flex-col gap-4 items-center mt-[76px] mb-0">
          <span className="description">Sign Up </span>
          <span className="name">InvoiceXpress</span>
        </div>
        <form
          className="xsm:w-full md:w-3/5 mt-4 md:mt-16 flex flex-col md:gap-12 gap-4 items-center justify-center"
          onSubmit={handleSubmit}
        >
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
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Confirm Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
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
