import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // GET USER
  const user = JSON.parse(localStorage.getItem("user"));

  // GET TOKEN
  const token = localStorage.getItem("token");

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/auth" />;
  }

  // NOT ADMIN
  if (!user?.role) {
    return <Navigate to="/" />;
  }

  // ADMIN ACCESS
  return children;
};

export default AdminRoute;
