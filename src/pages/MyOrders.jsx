import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders, cancelOrder } from "../features/order/orderSlice";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(cancelOrder(orderId)).unwrap();

      toast.success("Order cancelled successfully");

      dispatch(fetchMyOrders());
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">My Orders</h1>
        <p className="mt-2 text-gray-500">View and manage your orders</p>
      </div>

      {orders?.length === 0 ? (
        <div className="rounded-3xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-semibold">No Orders Found</h2>

          <p className="mt-2 text-gray-500">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-3xl border bg-white p-6 shadow-sm"
            >
              {/* HEADER */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order._id.slice(-8)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.orderStatus === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="space-y-4">
                {order.orderItems?.map((item, index) => (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-top"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="text-sm text-gray-500">Size: {item.size}</p>

                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">৳{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-bold">
                    Total Price: ৳ {order.totalPrice}
                  </p>
                </div>

                {(order.orderStatus === "Pending" ||
                  order.orderStatus === "Processing") && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="rounded-2xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
