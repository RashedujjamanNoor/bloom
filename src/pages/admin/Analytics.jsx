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

import {
  fetchAnalytics,
  fetchDashboardStats,
} from "../../features/admin/adminSlice";

const COLORS = ["#111827", "#2563EB", "#10B981", "#F59E0B", "#EF4444"];

export const Analytics = () => {
  const dispatch = useDispatch();

  const { analytics, stats, loading, error } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(fetchAnalytics());

    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-100 p-6 text-red-600">{error}</div>
    );
  }

  // ANALYTICS DATA
  const revenueData = analytics?.monthlyRevenue || [];

  const categoryData = analytics?.categoryAnalytics || [];

  const orderStatusData = analytics?.orderStatusAnalytics || [];

  const userGrowthData = analytics?.userGrowthAnalytics || [];

  const pendingOrders =
    orderStatusData.find((item) => item.status === "Pending")?.count || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 rounded-3xl bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor sales, customers, orders & store growth
          </p>
        </div>

        <button className="rounded-2xl bg-black px-5 py-3 font-medium text-white">
          Download Report
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center">
            <div>
              <div className="flex justify-center items-center gap-2">
                <div className="rounded-2xl bg-green-100 p-1 text-sm">💰</div>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>

              <h2 className="mt-3 text-4xl font-bold text-gray-800">
                ${stats?.totalRevenue || 0}
              </h2>
            </div>
          </div>

          <p className="mt-5 text-sm text-green-600">
            Revenue generated from all orders
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center">
            <div>
              <div className="flex justify-center items-center gap-2">
                <div className="rounded-2xl bg-green-100 p-1 text-sm">📦</div>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>

              <h2 className="mt-3 text-4xl font-bold text-gray-800">
                {stats?.totalOrders || 0}
              </h2>
            </div>
          </div>

          <p className="mt-5 text-sm text-blue-600">
            Orders placed by customers
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center">
            <div>
              <div className="flex justify-center items-center gap-2">
                <div className="rounded-2xl bg-green-100 p-1 text-sm">👥</div>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>

              <h2 className="mt-3 text-4xl font-bold text-gray-800">
                {stats?.totalUsers || 0}
              </h2>
            </div>
          </div>

          <p className="mt-5 text-sm text-purple-600">Registered customers</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center">
            <div>
              <div className="flex justify-center items-center gap-2">
                <div className="rounded-2xl bg-green-100 p-1 text-sm">🛍️</div>
                <p className="text-sm text-gray-500">Total Products</p>
              </div>

              <h2 className="mt-3 text-4xl font-bold text-gray-800">
                {stats?.totalProducts || 0}
              </h2>
            </div>
          </div>

          <p className="mt-5 text-sm text-orange-600">
            Total products in inventory
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* REVENUE */}
        <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Monthly Revenue
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Revenue growth overview
            </p>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111827" stopOpacity={0.4} />

                  <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#111827"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY PIE */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Product Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500">Category distribution</p>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={5}
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
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* ORDER STATUS */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Status</h2>

            <p className="mt-1 text-sm text-gray-500">
              Current order processing state
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="status" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" fill="#111827" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* USER GROWTH */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Growth</h2>

            <p className="mt-1 text-sm text-gray-500">
              New users registered each month
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563EB"
                strokeWidth={4}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Business Insights
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quick overview of store performance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
            <div className="text-4xl">🔥</div>

            <p className="mt-4 text-sm text-gray-500">Top Category</p>

            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              {categoryData?.[0]?.name || "N/A"}
            </h3>

            <p className="mt-2 text-sm text-green-600">
              Highest performing category
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
            <div className="text-4xl">⏳</div>

            <p className="mt-4 text-sm text-gray-500">Pending Orders</p>

            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              {pendingOrders}
            </h3>

            <p className="mt-2 text-sm text-orange-600">
              Orders waiting for processing
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
            <div className="text-4xl">📈</div>

            <p className="mt-4 text-sm text-gray-500">Customer Base</p>

            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              {stats?.totalUsers || 0} Users
            </h3>

            <p className="mt-2 text-sm text-blue-600">
              Active registered customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
