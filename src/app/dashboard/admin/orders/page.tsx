"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/v1/admin/orders");
      setOrders(res.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = orders.filter((o:any) =>
    o.orderId.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primarys)]">
            Orders
          </h1>
          <p className="text-sm text-[var(--color-muteds)]">
            Manage all customer orders
          </p>
        </div>

        <input
          placeholder="Search order..."
          className="border p-2 rounded w-64"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-10 bg-gray-200" />
          <div className="h-10 bg-gray-200" />
        </div>
      ) : (
        <div className="bg-white border rounded shadow overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[var(--color-bgs)] text-white">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o :any) => (
                <tr key={o.id} className="border-t">
                  <td className="p-3">{o.orderId}</td>
                  <td className="p-3">{o.customer?.name}</td>
                  <td className="p-3">${o.totalAmount}</td>
                  <td className="p-3">{o.status}</td>
                  <td className="p-3">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/dashboard/admin/orders/${o.id}`}
                      className="px-3 py-1 bg-[var(--color-primarys)] text-white rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-4 text-center text-[var(--color-muteds)]"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
