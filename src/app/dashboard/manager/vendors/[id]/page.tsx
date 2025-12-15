"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function VendorDetailsPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/v1/manager/vendors/${id}/performance`)
      .then(res => setVendor(res.data.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <div className="space-y-6 mt-10">
      {/* Vendor Info */}
      <Card className="bg-[var(--color-secondarys)] text-[var(--color-texts)]">
        <CardHeader><CardTitle>Vendor Info</CardTitle></CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {vendor.user?.name}</p>
          <p><strong>Shop:</strong> {vendor.shopname}</p>
          <p><strong>Status:</strong> {vendor.status}</p>
          <p><strong>Area:</strong> {vendor.area || "N/A"}</p>
        </CardContent>
      </Card>

      {/* Vendor Performance Chart */}
      <Card className="bg-[var(--color-bgs)] text-[var(--color-texts)]">
        <CardHeader><CardTitle>Monthly Sales</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendor.monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="var(--color-primarys)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-[var(--color-secondarys)] text-[var(--color-texts)]">
        <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendor?.orders?.map((o: any) => (
                <TableRow key={o.id}>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.status}</TableCell>
                  <TableCell>${o.total.toFixed(2)}</TableCell>
                  <TableCell>{new Date(o.createdat).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
