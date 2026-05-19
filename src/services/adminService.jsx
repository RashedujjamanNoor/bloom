import API from "../api/axios";

export const getDashboardStats = async () => {
  const res = await API.get("/admin/dashboard");

  return res.data;
};
