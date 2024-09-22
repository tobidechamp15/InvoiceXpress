// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6VEje5NPOtxghM_EePCpDWNz8x7UoCeA",
  authDomain: "invoiceexpress-tobiloba.firebaseapp.com",
  projectId: "invoiceexpress-tobiloba",
  storageBucket: "invoiceexpress-tobiloba.appspot.com",
  messagingSenderId: "368210905940",
  appId: "1:368210905940:web:ec2735994fb78052e1d6c1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const userId = localStorage.getItem("userId");

export { analytics };
export { db };
export { userId };
