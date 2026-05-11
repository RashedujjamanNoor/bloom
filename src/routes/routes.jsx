import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../layouts/HomeLayout";
import { SingleCategory } from "../pages/SingleCategory";
import { Home } from "../pages/Home";
import { Checkout } from "../pages/Checkout";
import AuthPage from "../pages/AuthPage";

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
]);

export default router;
