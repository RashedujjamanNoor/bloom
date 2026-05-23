import React, { useEffect } from "react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../features/admin/adminSlice";

import { toast } from "react-toastify";
import { useState } from "react";

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.admin);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // UPDATE STATUS
  const handleStatusChange = async (orderId, status) => {
    try {
      await dispatch(
        updateOrderStatus({
          id: orderId,
          status,
        }),
      ).unwrap();

      toast.success("Order status updated");
    } catch (err) {
      toast.error(err);
    }
  };

  // DELETE ORDER
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteOrder(id)).unwrap();

        toast.success("Order deleted successfully");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  // STATUS COLOR
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600";

      case "Processing":
        return "bg-blue-100 text-blue-600";

      case "Shipped":
        return "bg-purple-100 text-purple-600";

      case "Delivered":
        return "bg-green-100 text-green-600";

      case "Cancelled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders & shipping
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b bg-gray-50 text-sm uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Order ID</th>

                  <th className="px-6 py-4">Customer</th>

                  <th className="px-6 py-4">Products</th>

                  <th className="px-6 py-4">Total</th>

                  <th className="px-6 py-4">Payment</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4">Date</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b transition hover:bg-gray-50"
                  >
                    {/* ORDER ID */}
                    <td className="px-6 py-4 font-medium text-gray-700">
                      #{order._id.slice(-6)}
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {order.shippingAddress?.fullName}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {order.shippingAddress?.phone}
                        </p>
                      </div>
                    </td>

                    {/* PRODUCTS */}
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        {order.orderItems?.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-start gap-1"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {item.title}
                              </p>

                              <p className="text-sm text-gray-500">
                                Qty:
                                {item.quantity}
                              </p>
                            </div>
                            <p className="text-xs font-medium">
                              Color:{item.color}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* TOTAL */}
                    <td className="px-6 py-4 font-semibold">
                      ${order.totalPrice}
                    </td>

                    {/* PAYMENT */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-xs">
                          {order.paymentMethod}
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-xs ${
                            order.isPaid
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`rounded-xl border px-4 py-2 text-sm outline-none ${getStatusStyle(
                          order.orderStatus,
                        )}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200 cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(order._id)}
                          className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* VIEW ORDER MODAL */}
            {selectedOrder && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setSelectedOrder(null)}
              >
                <div
                  className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* HEADER */}
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order Details
                    </h2>

                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-3xl text-gray-500 hover:text-black"
                    >
                      ×
                    </button>
                  </div>

                  {/* CUSTOMER INFO */}
                  <div className="mb-6 rounded-2xl bg-gray-50 p-5">
                    <h3 className="mb-3 text-lg font-semibold">
                      Customer Information
                    </h3>

                    <div className="space-y-2 text-gray-600">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedOrder.shippingAddress?.fullName}
                      </p>

                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {selectedOrder.shippingAddress?.phone}
                      </p>

                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {selectedOrder.shippingAddress?.address}
                      </p>

                      <p>
                        <span className="font-medium">City:</span>{" "}
                        {selectedOrder.shippingAddress?.city}
                      </p>

                      <p>
                        <span className="font-medium">Postal Code:</span>{" "}
                        {selectedOrder.shippingAddress?.postalCode}
                      </p>

                      <p>
                        <span className="font-medium">Country:</span>{" "}
                        {selectedOrder.shippingAddress?.country}
                      </p>
                    </div>
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      Ordered Products
                    </h3>

                    <div className="space-y-4">
                      {selectedOrder.orderItems?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 rounded-2xl border p-4"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-20 w-20 rounded-2xl object-cover"
                          />

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {item.title}
                            </h4>

                            <p className="text-sm text-gray-500">
                              Size: {item.size}
                            </p>

                            <p className="text-sm text-gray-500">
                              Color: {item.color}
                            </p>

                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <div className="font-bold text-gray-800">
                            ${item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PAYMENT INFO */}
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <h3 className="mb-3 text-lg font-semibold">
                      Payment Information
                    </h3>

                    <div className="space-y-2 text-gray-600">
                      <p>
                        <span className="font-medium">Payment Method:</span>{" "}
                        {selectedOrder.paymentMethod}
                      </p>

                      <p>
                        <span className="font-medium">Payment Status:</span>{" "}
                        {selectedOrder.isPaid ? "Paid" : "Unpaid"}
                      </p>

                      <p>
                        <span className="font-medium">Order Status:</span>{" "}
                        {selectedOrder.orderStatus}
                      </p>

                      <p className="text-xl font-bold text-black">
                        Total: ${selectedOrder.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {orders?.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No orders found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
