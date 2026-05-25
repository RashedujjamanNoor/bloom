import API from "../api/axios";

// GET PRODUCTS
export const getProducts = async () => {
  const res = await API.get("/products");

  return res.data;
};
