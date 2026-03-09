import Navbar from "../components/Navbar";
import React from "react";
import { Home } from "../pages/Home";

export const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};
