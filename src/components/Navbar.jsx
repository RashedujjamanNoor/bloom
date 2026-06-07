import React, { useEffect } from "react";
import logo from "/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Cart } from "./Cart";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "../features/authSlice";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/auth");
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-999 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/category/men">Men</Link>
              </li>
              <li>
                <Link to="/category/women">Women</Link>
              </li>
              <li>
                <Link to="/category/kid">Kid</Link>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-36" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-3  menu-horizontal px-1">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative inline-block after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:w-0 after:bg-primary
     after:transition-all after:duration-300
     hover:after:w-full
     ${isActive ? "after:w-full" : ""}`
                }
                to="/category/men"
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative inline-block after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:w-0 after:bg-primary
     after:transition-all after:duration-300
     hover:after:w-full
     ${isActive ? "after:w-full" : ""}`
                }
                to="/category/women"
              >
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative inline-block after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:w-0 after:bg-primary
     after:transition-all after:duration-300
     hover:after:w-full
     ${isActive ? "after:w-full" : ""}`
                }
                to="/category/kid"
              >
                Kid
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div>
            <Cart />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full flex justify-center items-center bg-primary/10">
                <CiUser className="text-2xl" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/my-orders" className="justify-between">
                  My Orders
                </Link>
              </li>
              <li>
                {user?.role == "admin" ? (
                  <Link to="/dashboard">Dashboard</Link>
                ) : (
                  ""
                )}
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {isAuthenticated ? (
                  <a onClick={handleLogout}>Logout</a>
                ) : (
                  <Link to="/auth">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
