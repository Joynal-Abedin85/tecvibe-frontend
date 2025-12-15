"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    axios.get("/api/v1/user/orders").then((res) => {
      setOrders(res.data.data);
      console.log(res);
    });
  }, []);

  return (
    <div className="max-w-4xl mt-10 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.map((order: any) => (
        <div
          key={order.id}
          className="flex justify-between p-4 shadow mb-3 rounded"
        >
          <div>
            <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
            <p className="text-sm">Total: ৳{order.total}</p>
          </div>

          <Link
            href={`/dashboard/user/orders/${order.id}`}
            className="text-blue-600"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
