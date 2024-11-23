import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import google from "../assets/google.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";

const SignInWithGoogle = () => {
  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    // setLoading(true); // Show loader for Google sign-in

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
      // navigate("/dashboard/information");
      console.log(token);
      navigate("/dashboard/information");
      createUserProfile(user);
    } catch (error) {
      console.error(error);
      // setError(true);
    } finally {
      // setLoading(false); // Stop loading after process
    }
  };

  const createUserProfile = (user) => {
    const userDocRef = doc(db, "users", user.uid);
    console.log({
      username: user.displayName,
      id: user.uid,
      email: user.email,
    });
    const userProfileData = {
      username: user.displayName,
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
    <div
      className="flex cursor-pointer gap-4 md:w-3/5 border-gray-300 border w-full text-gray-800 items-center p-3 my-5 rounded-full justify-center transition hover:bg-gray-100 duration-300"
      onClick={handleSignInWithGoogle}
    >
      <img src={google} alt="Google Icon" className="w-5 h-5" />
      <span>Sign in with Google</span>
    </div>
  );
};

export default SignInWithGoogle;
