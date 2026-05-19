import { Outlet } from "react-router";

import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex bg-gray-100">
        {/* SIDEBAR */}
        <div className="w-[260px] bg-white shadow-lg">
          <AdminSidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
