import { NavLink } from "react-router";

const AdminSidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Products",
      path: "/dashboard/products",
    },

    {
      name: "Orders",
      path: "/dashboard/orders",
    },

    {
      name: "Users",
      path: "/dashboard/users",
    },

    {
      name: "Analytics",
      path: "/dashboard/analytics",
    },
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `p-3 rounded-lg font-medium transition-all

                ${isActive ? "bg-black text-white" : "hover:bg-gray-200"}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
