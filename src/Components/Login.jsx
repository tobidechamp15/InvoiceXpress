import React, { useState } from "react";
import logo from "../assets/logo.svg";
import google from "../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app, db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const { saveUser } = useUser();

  const handleEmail = (e) => {
    setError(false);
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setError(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      const auth = getAuth(app);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      localStorage.setItem("userId", user.uid);

      const userProfile = await fetchUserProfile(user.uid);
      console.log("User Profile", userProfile);
      saveUser(userProfile);
      console.log(user);
      // saveUser(userData);
      navigate("/dashboard/information");
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false); // Stop loading after the process is done
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true); // Show loader for Google sign-in

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const loggedInUserId = user.uid;
      localStorage.setItem("userId", loggedInUserId);
      console.log(user);
      saveUser(user);
      // navigate("/dashboard/information");
      console.log(token);
      navigate("/dashboard/information");
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false); // Stop loading after process
    }
  };

  return (
    <div className="relative flex w-full xsm:min-h-screen bg-white text-gray-800">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      <Link
        to="/"
        className="h-screen w-[30%] hidden md:flex items-center justify-center bg-gray-100"
      >
        <img src={logo} alt="Logo" className="" />
      </Link>
      <div className="xsm:w-full md:m-20 xsm:p-5 md:w-[70%] flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center mt-[60px] mb-2">
          <span className="text-lg font-medium text-gray-600">Sign in to</span>
          <span className="text-2xl font-bold text-gray-900 tracking-wide">
            InvoiceXpress
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="xsm:w-full md:w-3/5 mt-8 flex flex-col gap-6 items-center justify-center"
        >
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="input-nae text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="form-control input-text w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              value={email}
              onChange={handleEmail}
              required
              disabled={loading} // Disable input during loading
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <label className="input-nme text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="form-control input-text w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              value={password}
              onChange={handlePassword}
              required
              disabled={loading} // Disable input during loading
            />
          </div>
          {error && (
            <div className="text-red-500 w-full text-sm">
              Incorrect email or password
            </div>
          )}
          <Link
            to="/forgotPassword"
            className="text-blue-500 text-sm underline w-full mt-1 hover:text-blue-600 transition-all duration-200"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="action-btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-full rounded-lg transition-transform transform hover:scale-105 focus:scale-95 duration-300"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div
          className="flex cursor-pointer gap-4 md:w-3/5 border-gray-300 border w-full text-gray-800 items-center p-3 my-5 rounded-full justify-center transition hover:bg-gray-100 duration-300"
          onClick={handleSignInWithGoogle}
        >
          <img src={google} alt="Google Icon" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </div>
        <div className="my-4">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="link-action text-blue-500 underline ml-2 hover:text-blue-600 transition-all duration-200"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
