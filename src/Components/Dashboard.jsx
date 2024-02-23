import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import dashIcon from "../assets/dashIcon.svg";
import receiptIcon from "../assets/ReceiptIcon.svg";
import report from "../assets/report.svg";
import products from "../assets/products.svg";
import axiosInstance from "./axios/axios";
import userAvatar from "../assets/user.svg";
import headers from "./headers/headers";
import Logout from "./Logout";

// import Logout from "./Logout";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const [user, setUser] = useState({});

  const loggedInUser = localStorage.getItem("userID");
  // const userToken = localStorage.getItem("userToken");
  const getAllUsers = () => {
    axiosInstance
      .get(`/getUserById/${loggedInUser}`, { headers })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.log(user);
        console.error(err.response);
      });
  };

  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    getAllUsers();
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDropdownClick = (index) => {
    // Toggle the dropdown when its title is clicked
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const dropdownData = [
    {
      logo: products,
      title: "Products",
      items: [
        {
          item: " Products",
          linkTo: "/dashboard/products",
        },
        {
          item: "Add Products",
          linkTo: "/dashboard/add-products",
        },
        {
          item: "Delete Products",
          linkTo: "/dashboard/delete-products",
        },
      ],
    },
    {
      icon: faGear,
      title: "Profile Settings",
      items: [
        {
          item: "Change Password",
          linkTo: "/dashboard/changePassword",
        },
        {
          item: "Upgrade Profile",
          linkTo: "/dashboard/upgradeProfile",
        },
        // {
        //   item: "Sign In",
        //   linkTo: "/",
        // },
      ],
    },
  ];

  return (
    <section className="w-100">
      <section
        className={`flex w-[255px]  overflow-auto bg-[#1E1B18]  flex-col h-screen   side-shadow z-50 fixed transition-all ease-in-out duration-700 ${
          sidebarOpen ? "left-0  " : "xsm:-left-[255px]"
        }`}
        ref={sidebarRef}
        id="side-bar"
      >
        <div className="w-100 flex flex-col self-center gap-2 h-full ">
          <Link to="/" className="flex items-center justify-center">
            <img src={logo} alt="" />
          </Link>
          <div className="flex flex-col w-100 h-full justify-around mt-[120px] px-4">
            <section className="flex flex-col gap-3 ">
              <NavLink
                to="/dashboard/information"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "active-tab"
                      : "hover:text-white hover:bg-blue-600"
                  } px-2 sideBar-tabs flex gap-2 items-center just rounded-lg py-2
              `
                }
              >
                <img src={dashIcon} alt="" />
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/generate-receipt"
                className={({ isActive }) =>
                  `${
                    isActive ? "active-tab " : "text-white hover:bg-blue-600"
                  } px-2 sideBar-tabs flex gap-2 items-center just  rounded-lg py-2`
                }
              >
                <img src={receiptIcon} alt="" />
                Generate Receipt
              </NavLink>
              <NavLink
                to="/dashboard/transaction-report"
                className={({ isActive }) =>
                  `${
                    isActive ? "active-tab" : "text-white hover:bg-blue-600 "
                  } ps-2 sideBar-tabs flex gap-2 items-center justif-center rounded-lg py-2`
                }
              >
                <img src={report} alt="" />
                Transaction Report
              </NavLink>
              <ul className="list mt-2 list-non w-full flex gap-2 flex-col items-center   transition-all ease-in-out duration-500">
                {dropdownData.map((dropdown, index) => (
                  <li
                    className="w-full flex flex-col hm text-white  hover:text-white "
                    key={index}
                  >
                    <div
                      className={`${
                        activeDropdown === index
                          ? "bg text-white w-100 rounded "
                          : ""
                      } flex  items-center justify-between w-full  transition-all ease-in-out duration-500 cursor-pointer`}
                      onClick={() => handleDropdownClick(index)}
                    >
                      <span
                        className={
                          activeDropdown === index
                            ? "b text-white w-100 p-2 cursor-pointer  flex items-center gap-2"
                            : "p-2 cursor-pointer flex gap-2 items-center "
                        }
                      >
                        {dropdown.logo ? (
                          <img src={dropdown.logo} alt="" />
                        ) : null}
                        {
                          <FontAwesomeIcon
                            icon={dropdown.icon}
                            className="text-xl"
                          />
                        }
                        {dropdown.title}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`icon ${
                          activeDropdown === index
                            ? "rotate p-2  text-white text-justify"
                            : " p-2 "
                        }`}
                      />
                    </div>
                    <div
                      className={`${
                        activeDropdown === index
                          ? "dropdown-content dropdown-open flex flex-col p-[5%]"
                          : "dropdown-content dropdown-transition flex flex-col"
                      }`}
                    >
                      {dropdown.items.map((item, itemIndex) => (
                        <NavLink
                          key={itemIndex}
                          to={item.linkTo}
                          className="p-3"
                        >
                          {item.item}
                        </NavLink>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <Logout />
          </div>
        </div>
      </section>
      <section className=" flex flex-col  md:ms-[255px] ">
        <div className="flex w-100 b md:py-10 py-3 items-center justify-between top-bar px-9">
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleSidebar}
            className="me-3 md:hidden  cursor-pointer text-3xl text-blue-700 hover:fa-spin"
            spin
          />
          <span className="text-xl xs:hidden font-bold"></span>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-white">Welcome {user.username}</span>
            <img src={userAvatar} alt="" />
          </div>
        </div>
        <Outlet />
        {/* <div className="bg-white h-full">kskca.alkak</div> */}
      </section>
    </section>
  );
};

export default Dashboard;
