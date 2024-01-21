import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import dashIcon from "../assets/dashIcon.svg";
import receiptIcon from "../assets/ReceiptIcon.svg";
import report from "../assets/report.svg";
import products from "../assets/products.svg";
import axiosInstance from "./axios/axios";
import userAvatar from "../assets/user.svg";

// import Logout from "./Logout";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const [user, setUser] = useState({});

  const loggedInUser = localStorage.getItem("userID");
  const getAllUsers = () => {
    axiosInstance
      .get("/getUsers")
      .then((response) => {
        console.log(response.data.data);
        const users = response.data.data;
        const loggedInUserInfo = users.find(
          (data) => data._id === loggedInUser
        );
        setUser(loggedInUserInfo);
        console.log("user", user);
      })
      .catch((err) => {
        console.log(user);
        console.error(err);
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
          item: "Add Products",
          linkTo: "/invoicer/home",
        },
        {
          item: " Products",
          linkTo: "/invoicer/home",
        },
      ],
    },
    {
      title: "Profile Settings",
      items: [
        {
          item: "Create Profile",
          linkTo: "/invoicer/settings",
        },
        {
          item: "Update Profile",
          linkTo: "/invoicer/home",
        },
        {
          item: "Sign In",
          linkTo: "/",
        },
      ],
    },
  ];

  return (
    <section className="w-100">
      <section
        className={`flex w-[255px]   bg-[#1E1B18]  flex-col h-screen shadow-lg z-50 fixed transition-all ease-in-out duration-700 ${
          sidebarOpen ? "left-0  " : "xsm:-left-[255px]"
        }`}
        ref={sidebarRef}
        id="side-bar"
      >
        <div className="w-100 flex flex-col self-center gap-2 h-full bg-black">
          <Link to="/" className="flex items-center justify-center">
            <img src={logo} alt="" />
          </Link>
          <div className="flex flex-col w-100 h-full justify-between mt-[120px] px-4">
            <section className="flex flex-col gap-3 ">
              <NavLink
                to="/dashboard/information"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "active-tab"
                      : "text-blue-500 hover:text-white hover:bg-blue-600"
                  } sideBar-tabs flex gap-2 items-center justify-center rounded-lg py-2
              `
                }
              >
                <img src={dashIcon} alt="" />
                Dashboard
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) =>
                  `${
                    isActive ? "active-tab " : "text-white "
                  } sideBar-tabs flex gap-2 items-center justify-center rounded-lg py-2`
                }
              >
                <img src={receiptIcon} alt="" />
                Generate Receipt
              </NavLink>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `${
                    isActive ? "active-tab" : "text-blue-500 "
                  } sideBar-tabs flex gap-2 items-center justify-center rounded-lg py-2`
                }
              >
                <img src={report} alt="" />
                <span className="-">Transaction Report</span>
              </NavLink>
              <ul className="list mt-2 list-non w-full flex gap-2 flex-col items-center   transition-all ease-in-out duration-500">
                {dropdownData.map((dropdown, index) => (
                  <li
                    className="w-full flex flex-col hm text-blue-500  hover:text-white hover:bg-blue-500"
                    key={index}
                  >
                    <div
                      className={`${
                        activeDropdown === index
                          ? "bg-blue-500 text-white w-100 "
                          : ""
                      } flex  items-center justify-between w-full  transition-all ease-in-out duration-500 cursor-pointer`}
                      onClick={() => handleDropdownClick(index)}
                    >
                      <span
                        className={
                          activeDropdown === index
                            ? "bg-blue-500 text-white w-100 p-[5%] cursor-pointer flex gap-2"
                            : "p-[5%] cursor-pointer flex gap-2"
                        }
                      >
                        <img src={dropdown.logo} alt="" />
                        {dropdown.title}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`icon ${
                          activeDropdown === index
                            ? "rotate p-[5%]  text-white  text-justify"
                            : " p-[5%] "
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
            {/* <><Logout /></> */}
          </div>
        </div>
      </section>
      <section className=" flex flex-col  md:ms-[255px] ">
        <div className="flex w-100 b p-3 justify-between top-bar shadow-xl">
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleSidebar}
            className="me-3 md:hidden  cursor-pointer text-3xl text-blue-700 hover:fa-spin"
            spin
          />
          <span className="text-xl xs:hidden font-bold"></span>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-white">{user.username}</span>
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
