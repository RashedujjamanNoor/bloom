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

//EDIT Product
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

// GET ALL ORDERS
export const getOrders = async () => {
  const res = await API.get("orders/admin/all");

  return res.data;
};

// UPDATE ORDER STATUS
export const changeOrderStatus = async (id, status) => {
  const res = await API.put(`/orders/admin/${id}`, {
    status,
  });

  return res.data;
};

// CANCEL ORDER
export const removeOrder = async (id) => {
  const res = await API.put(`/orders/cancel//${id}`);

  return res.data;
};

// GET USERS
export const getUsers = async () => {
  const res = await API.get("/admin/users");

  return res.data;
};

// UPDATE USER ROLE
export const changeUserRole = async (id, role) => {
  const res = await API.put(`/admin/users/${id}`, {
    role,
  });

  return res.data;
};

// DELETE USER
export const removeUser = async (id) => {
  const res = await API.delete(`/admin/users/${id}`);

  return res.data;
};
