import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardCard from "../../components/dashboard/DashboardCard";

import { fetchDashboardStats } from "../../features/admin/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard title="Revenue" value={`$${stats?.totalRevenue || 0}`} />

        <DashboardCard title="Orders" value={stats?.totalOrders || 0} />

        <DashboardCard title="Users" value={stats?.totalUsers || 0} />

        <DashboardCard title="Products" value={stats?.totalProducts || 0} />
      </div>
    </div>
  );
};

export default Dashboard;
