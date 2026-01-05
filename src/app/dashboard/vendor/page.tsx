"use client";

import axios from "@/lib/axioss";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VendorDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/v1/vendor/dashboard")
      .then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  const statsCards = [
    { title: "Total Products", value: stats.totalProducts },
    { title: "Total Orders", value: stats.totalOrders },
    { title: "Revenue", value: `$${stats.revenue}` },
  ];

  const quickLinks = [
    { title: "Manage or add Products", path: "/dashboard/vendor/products" },
    { title: "View Orders", path: "/dashboard/vendor/orders" },
    { title: "Order Performance", path: "/dashboard/vendor/order-performance" },
    { title: "Inventory Status", path: "/dashboard/vendor/inventory-status" },
    { title: "Sales Overview", path: "/dashboard/vendor/sales" },
    { title: "Revenue", path: "/dashboard/vendor/revenue" },
    { title: "Stock", path: "/dashboard/vendor/stock" },
    { title: "Returns", path: "/dashboard/vendor/returns" },
    { title: "Refunds", path: "/dashboard/vendor/refunds" },
    { title: "Chat", path: "/dashboard/vendor/chat" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="mt-2 text-2xl font-bold">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quickLinks.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="rounded-lg border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Go to {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
