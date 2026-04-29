import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../layouts/HomeLayout";
import { SingleCategory } from "../pages/SingleCategory";
import { Home } from "../pages/Home";

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
    ],
  },
]);

export default router;
