"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  console.log(orders)

  useEffect(() => {
    axios.get("/api/v1/user/orders").then((res) => setOrders(res.data.data));
  }, []);

  return (
    <div className="max-w-4xl mt-10 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders?.map((order: any) => (
        <div
          key={order._id}
          className="flex justify-between p-4 shadow mb-3 rounded"
        >
          <p>Order #{order._id}</p>
          <Link
            href={`/dashboard/user/orders/${order._id}`}
            className="text-blue-600"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
