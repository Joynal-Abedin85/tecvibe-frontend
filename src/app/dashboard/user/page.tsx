"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

export default function UserDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState([]);
  console.log(orders)

  useEffect(() => {
    axios.get("/api/v1/user/profile").then((res) => setProfile(res.data));
    axios.get("/api/v1/user/orders").then((res) => setOrders(Array.isArray(res.data?.data) ? res.data.data : []));
  }, []);

  if (!profile)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Welcome, {profile?.name} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="border rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>

          <img
            src={profile?.avatar || "/avatar.png"}
            className="h-20 w-20 rounded-full mb-4"
          />

          <p className="font-semibold text-lg">{profile?.name}</p>
          <p className="text-gray-600">{profile?.email}</p>

          <Link
            href="/dashboard/user/profile"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>

          <div className="space-y-3">
            <Link
              href="/dashboard/user/orders"
              className="block p-3 border rounded-lg hover:bg-gray-100 transition"
            >
              📦 My Orders
            </Link>

            <Link
              href="/dashboard/user/cart"
              className="block p-3 border rounded-lg hover:bg-gray-100 transition"
            >
              🛒 My Cart
            </Link>

            <Link
              href="/dashboard/user/wishlist"
              className="block p-3 border rounded-lg hover:bg-gray-100 transition"
            >
              ❤️ My Wishlist
            </Link>
             <Link
              href="/dashboard/user/applyvendor"
              className="block p-3 border rounded-lg hover:bg-gray-100 transition"
            >
              ❤️ apply vendor
            </Link>
          </div>
        </div>

        {/* Stats Card */}
        <div className="border rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Your Stats</h2>

          <div className="space-y-3">
            <div className="flex justify-between p-3 border rounded-lg">
              <span>Total Orders</span>
              <span className="font-bold">{orders.length}</span>
            </div>

            <div className="flex justify-between p-3 border rounded-lg">
              <span>Wishlist Items</span>
              <span className="font-bold">{profile?.wishlistCount || 0}</span>
            </div>

            <div className="flex justify-between p-3 border rounded-lg">
              <span>Cart Items</span>
              <span className="font-bold">{profile?.cartCount || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

        {orders?.length === 0 ? (
          <p className="text-gray-600">You have no recent orders.</p>
        ) : (
          <div className="space-y-4">
            {orders?.slice(0, 3).map((order: any) => (
              <div
                key={order.id}
                className="border p-4 rounded-xl flex justify-between items-center shadow-sm"
              >
                <div>
                  <p className="font-bold">Order #{order.id}</p>
                  <p className="text-gray-600">Total: ${order.total}</p>
                  <p className="text-sm text-green-600">{order.status}</p>
                </div>

                <Link
                  href={`/dashboard/user/orders/${order.id}`}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
