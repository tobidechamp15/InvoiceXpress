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
import SetUp from "./Components/SetUp";
import Dashboard from "./Components/Dashboard";
import AppInfo from "./Components/AppInfo";
import Recgen from "./Components/Recgen";
import Products from "./Components/Products";
import ChangePassword from "./Components/ChangePassword";

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
      {
        path: "/dashboard/add-products",
        element: <Products />,
      },
      {
        path: "/dashboard/changePassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
