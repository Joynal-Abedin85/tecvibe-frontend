"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "./sidebar";
import Link from "next/link";

export default function ManagerDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/v1/manager/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard Home</h1>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          <Link href="/dashboard/manager/products">
            <Card className="bg-[var(--color-primarys)] text-[var(--color-texts)] hover:scale-105 transition-transform">
              <CardHeader><CardTitle>Products</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold">{stats?.totalProducts}</CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/manager/orders">
            <Card className="bg-[var(--color-secondarys)] text-[var(--color-texts)] hover:scale-105 transition-transform">
              <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold">{stats?.totalOrders}</CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/manager/vendors">
            <Card className="bg-[var(--color-accents)] text-black hover:scale-105 transition-transform">
              <CardHeader><CardTitle>Vendors</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold">{stats?.totalVendors}</CardContent>
            </Card>
          </Link>
        </div>

        {/* Monthly Orders Chart */}
        <Card className="col-span-2 shadow-md bg-[var(--color-bgs)] text-[var(--color-texts)]">
          <CardHeader><CardTitle>Monthly Orders</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthlyOrders}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primarys)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

