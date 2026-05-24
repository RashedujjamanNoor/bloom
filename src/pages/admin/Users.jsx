import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsers,
  updateUserRole,
  deleteUser,
} from "../../features/admin/adminSlice";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const Users = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.admin);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // UPDATE ROLE
  const handleRoleChange = async (id, role) => {
    try {
      await dispatch(
        updateUserRole({
          id,
          role,
        }),
      ).unwrap();

      toast.success("User role updated");
    } catch (err) {
      toast.error(err);
    }
  };

  // DELETE USER
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
        await dispatch(deleteUser(id)).unwrap();

        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err);
      }
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
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>

          <p className="mt-2 text-gray-500">Manage all registered users</p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-50 text-sm uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">User</th>

                  <th className="px-6 py-4">Email</th>

                  <th className="px-6 py-4">Provider</th>

                  <th className="px-6 py-4">Role</th>

                  <th className="px-6 py-4">Joined</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b transition hover:bg-gray-50"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={user.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {user.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            ID:{user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>

                    {/* PROVIDER */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          user.provider === "google"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.provider}
                      </span>
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className={`rounded-xl border px-4 py-2 text-sm outline-none cursor-pointer ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="user">user</option>

                        <option value="admin">admin</option>
                      </select>
                    </td>

                    {/* JOIN DATE */}
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200 cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
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

            {users?.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No users found
              </div>
            )}
          </div>
        </div>

        {/* VIEW USER MODAL */}
        {selectedUser && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="w-full max-w-2xl rounded-3xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  User Details
                </h2>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-3xl text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              {/* USER INFO */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={
                    selectedUser.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={selectedUser.name}
                  className="mb-4 h-28 w-28 rounded-full object-cover"
                />

                <h3 className="text-2xl font-bold">{selectedUser.name}</h3>

                <p className="mt-1 text-gray-500">{selectedUser.email}</p>

                <div className="mt-6 w-full space-y-4 rounded-2xl bg-gray-50 p-5 text-left">
                  <p>
                    <span className="font-semibold">Role:</span>{" "}
                    {selectedUser.role}
                  </p>

                  <p>
                    <span className="font-semibold">Provider:</span>{" "}
                    {selectedUser.provider}
                  </p>

                  <p>
                    <span className="font-semibold">Firebase UID:</span>{" "}
                    {selectedUser.firebaseUid || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">Joined:</span>{" "}
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-semibold">User ID:</span>{" "}
                    {selectedUser._id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
