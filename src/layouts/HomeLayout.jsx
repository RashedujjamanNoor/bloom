import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
