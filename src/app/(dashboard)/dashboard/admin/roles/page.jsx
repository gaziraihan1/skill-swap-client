"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function AdminRoles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      const data = await res.data;
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(
        `https://skill-swap-with-next-server.vercel.app/users/admin/${email}`
      );
      const result = await res.data;
      if (result.modifiedCount > 0) {
        toast.success("User promoted to admin");
        fetchUsers();
      } else {
        toast.error("Failed to promote user");
      }
    } catch (err) {
      toast.error("Error promoting user");
    }
  };

  if (loading) {
    return <div className="animate-pulse text-gray-500">Loading users...</div>;
  }

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Roles</h2>
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3">Photo</th>
            <th className="text-left px-6 py-3">Name</th>
            <th className="text-left px-6 py-3">Email</th>
            <th className="text-left px-6 py-3">Role</th>
            <th className="text-left px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <Image
                  src={user.photo || "/default-user.png"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="px-6 py-4 font-medium">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4 capitalize">{user.role}</td>
              <td className="px-6 py-4">
                {user.role === "user" ? (
                  <button
                    onClick={() => handleMakeAdmin(user.email)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all text-sm flex items-center gap-1"
                  >
                    <FaUserShield className="text-white" />
                    Make Admin
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">Admin</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
