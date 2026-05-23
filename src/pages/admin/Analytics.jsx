import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { fetchDashboardStats } from "../../features/admin/adminSlice";

const COLORS = ["#111827", "#2563EB", "#10B981", "#F59E0B", "#EF4444"];

export const Analytics = () => {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  console.log(stats);

  if (loading) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  // CHART DATA
  const revenueData = stats?.monthlyRevenue || [];

  const categoryData = stats?.categoryAnalytics || [];

  const orderStatusData = stats?.orderStatusAnalytics || [];

  const userGrowthData = stats?.userGrowthAnalytics || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Analytics</h1>

        <p className="mt-2 text-gray-500">
          Store performance & business analytics
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Revenue</p>

          <h2 className="mt-3 text-3xl font-bold">
            ${stats?.totalRevenue || 0}
          </h2>

          <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
            Revenue
          </span>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Orders</p>

          <h2 className="mt-3 text-3xl font-bold">{stats?.totalOrders || 0}</h2>

          <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
            Orders
          </span>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Users</p>

          <h2 className="mt-3 text-3xl font-bold">{stats?.totalUsers || 0}</h2>

          <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
            Customers
          </span>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Products</p>

          <h2 className="mt-3 text-3xl font-bold">
            {stats?.totalProducts || 0}
          </h2>

          <span className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
            Inventory
          </span>
        </div>
      </div>

      {/* CHARTS */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* REVENUE CHART */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Monthly Revenue</h2>

            <button className="rounded-xl bg-black px-4 py-2 text-sm text-white">
              Export
            </button>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111827" stopOpacity={0.4} />

                  <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#111827"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY PIE */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">Product Categories</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ORDER STATUS */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">Order Status</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="status" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* USER GROWTH */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">User Growth</h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Business Insights</h2>

          <button className="rounded-xl bg-black px-4 py-2 text-sm text-white">
            Download Report
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">Best Selling Category</p>

            <h3 className="mt-2 text-xl font-bold">
              {categoryData?.[0]?.name || "N/A"}
            </h3>

            <p className="mt-2 text-sm text-green-600">
              Highest sales category
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">Pending Orders</p>

            <h3 className="mt-2 text-xl font-bold">
              {orderStatusData.find((item) => item.status === "Pending")?.count}
            </h3>

            <p className="mt-2 text-sm text-orange-600">Need processing</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">Active Customers</p>

            <h3 className="mt-2 text-xl font-bold">{stats?.totalUsers || 0}</h3>

            <p className="mt-2 text-sm text-blue-600">Registered users</p>
          </div>
        </div>
      </div>
    </div>
  );
};
