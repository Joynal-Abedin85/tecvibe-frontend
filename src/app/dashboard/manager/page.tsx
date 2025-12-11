"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card className="bg-[var(--color-primarys)] text-[var(--color-texts)]">
        <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
        <CardContent className="text-3xl font-bold">{stats?.totalOrders}</CardContent>
      </Card>

      <Card className="bg-[var(--color-secondarys)] text-[var(--color-texts)]">
        <CardHeader><CardTitle>Pending Products</CardTitle></CardHeader>
        <CardContent className="text-3xl font-bold">{stats?.pendingProducts}</CardContent>
      </Card>

      <Card className="bg-[var(--color-accents)] text-black">
        <CardHeader><CardTitle>Vendors</CardTitle></CardHeader>
        <CardContent className="text-3xl font-bold">{stats?.vendors}</CardContent>
      </Card>

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
  );
}
