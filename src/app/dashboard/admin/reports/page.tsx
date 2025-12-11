"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/admin/reports")
      .then((res) => setData(res.data?.data))
      .catch(() => console.log("Error fetching reports"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primarys)]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-10 xl:grid-cols-3 gap-6">

      {/* Summary Cards */}
      <Card className="bg-[var(--color-primarys)] text-white shadow-md">
        <CardHeader><CardTitle>Total Sales</CardTitle></CardHeader>
        <CardContent className="text-3xl font-bold">৳{data?.revenueTrend}</CardContent>
      </Card>

      <Card className="bg-[var(--color-secondarys)] text-white shadow-md">
        <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
        <CardContent className="text-3xl font-bold">{data?.totalOrders}</CardContent>
      </Card>

      <Card className="bg-[var(--color-accents)] text-black shadow-md">
        <CardHeader><CardTitle>Total Vendors</CardTitle></CardHeader>
        <CardContent className="text-3xl font-bold">{data?.totalVendors}</CardContent>
      </Card>


      {/* Sales Chart */}
      <Card className="col-span-2 shadow-md">
        <CardHeader><CardTitle>Monthly Sales</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="var(--color-primarys)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card className="shadow-md">
        <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.revenueTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-accents)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
