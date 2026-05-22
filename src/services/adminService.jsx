import API from "../api/axios";

//DASHBOARD
export const getDashboardStats = async () => {
  const res = await API.get("/admin/dashboard");

  return res.data;
};

//GET PRODUCTS
export const getProducts = async () => {
  const res = await API.get("/products");

  return res.data;
};

// ADD PRODUCT
export const createProduct = async (productData) => {
  const res = await API.post("/products", productData);

  return res.data;
};

//EDIT
export const updateProduct = async (id, productData) => {
  const res = await API.put(`/products/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);

  return res.data;
};
