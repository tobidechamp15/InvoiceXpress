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
import GetStarted from "./Components/GetStarted";
import SetUp from "./Components/SetUp";

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
    path: "/get-started",
    element: <GetStarted />,
    children: [
      {
        path: "/get-started/signUp",
        element: <SignUp />,
      },
      {
        path: "/get-started/create-profile",
        element: <CreateProfile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
