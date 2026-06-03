import API from "../api/axios.js";

export const createOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);

  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get("/orders/my-orders");

  return res.data;
};

export const cancelOrder = async (id) => {
  const res = await API.put(`/orders/cancel/${id}`);

  return res.data;
};
