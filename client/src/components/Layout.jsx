import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Badge, message } from "antd";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  //########## Doctor Menu #########//
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  //########## Doctor Menu #########//

  //logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  //rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const changeToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div
            className={`sidebar ${
              toggle ? "w-[60px]" : "md:w-[260px] w-[210px]"
            } `}
          >
            {/* Responsive menu bar */}
            <div className="relative  m-2">
              <i
                className={`fa-solid ${
                  toggle ? "fa-arrow-right" : "fa-arrow-left"
                } top-0 right-0 absolute duration-700 text-2xl cursor-pointer ${
                  toggle ? "mb-[100px]" : "mb-0"
                }`}
                onClick={changeToggle}
              ></i>
            </div>
            <div className={`logo ${toggle ? "hidden" : "block"}`}>
              <img src={logo} alt="logo" />
            </div>

            <hr className={`${toggle ? "hidden" : "block"}`}></hr>
            <div className={`h-2 w-full`}></div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`menu-item ${isActive && "active"}`}
                    key={menu.name}
                  >
                    <Link to={menu.path} className="text-[13px] sm:text-[19px]">
                      <i
                        className={`${menu.icon}  ${
                          toggle ? "text-[19px]" : "sm:text-[19px] text-[13px]"
                        }`}
                      ></i>
                      <span className={`${toggle ? "hidden" : "inline"}`}>
                        {menu.name}
                      </span>
                    </Link>
                  </div>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <Link to="/login" className="text-[13px] sm:text-[19px]">
                  <i
                    className={`fa-solid fa-right-from-bracket ${
                      toggle ? "text-[19px]" : "sm:text-[19px] text-[13px7]"
                    }`}
                  ></i>
                  <span className={`${toggle ? "hidden" : "inline"}`}>
                    Logout
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  count={user && user.notification.length}
                  className="w-[22px] mr-3 cursor-pointer"
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body overflow-x-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
