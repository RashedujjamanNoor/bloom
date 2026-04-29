import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
