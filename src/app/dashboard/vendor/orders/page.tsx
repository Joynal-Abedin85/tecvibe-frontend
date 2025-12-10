"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/vendors/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">Orders</h1>

      <div className="border rounded shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">৳{order.totalAmount}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === "pending"
                        ? "bg-yellow-600"
                        : order.status === "shipped"
                        ? "bg-blue-600"
                        : order.status === "delivered"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3">
                  <Link
                    href={`/dashboard/vendor/orders/${order.id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
