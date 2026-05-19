import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../layouts/HomeLayout";
import { SingleCategory } from "../pages/SingleCategory";
import { Home } from "../pages/Home";
import { Checkout } from "../pages/Checkout";
import AuthPage from "../pages/AuthPage";
import AdminRoute from "./adminRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/admin/Dashboard";
import { Products } from "../pages/admin/Products";
import { Orders } from "../pages/admin/Orders";
import { Users } from "../pages/admin/Users";
import { Analytics } from "../pages/admin/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/men",
        element: <SingleCategory />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "users",
        element: <Users />,
      },

      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);

export default router;
