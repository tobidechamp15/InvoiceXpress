import React from "react";
import ReactDOM from "react-dom/client";

//Routing
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Linking bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//Routes
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CreateProfile from "./Components/CreateProfile";
import SetUp from "./Components/SetUp";
import Dashboard from "./Components/Dashboard";
import AppInfo from "./Components/AppInfo";
// import GenerateReceipt from "./Components/GenerateReceipt";
import Recgen from "./Components/Recgen";

//Create a Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/setUp",
    element: <SetUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/information",
        element: <AppInfo />,
      },
      {
        path: "/dashboard/generate-receipt",
        element: <Recgen />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
