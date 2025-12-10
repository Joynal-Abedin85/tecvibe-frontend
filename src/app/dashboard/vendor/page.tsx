"use client";

import axios from "@/lib/axioss";
import { useEffect, useState } from "react";

export default function VendorDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/v1/vendors/dashboard").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Vendor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 border rounded shadow">
          <p className="text-gray-600">Total Products</p>
          <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
        </div>

        <div className="p-6 border rounded shadow">
          <p className="text-gray-600">Total Orders</p>
          <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
        </div>

        <div className="p-6 border rounded shadow">
          <p className="text-gray-600">Revenue</p>
          <h2 className="text-2xl font-bold">${stats.revenue}</h2>
        </div>
      </div>
    </div>
  );
}
