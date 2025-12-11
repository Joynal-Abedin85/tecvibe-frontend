"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersByAreaPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/v1/manager/orders/area")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAssignDelivery = (orderId: string) => {
    setUpdating(orderId);
    axios.post(`/api/v1/manager/orders/${orderId}/assign-delivery`)
      .then(() => {
        alert("Delivery Boy Assigned!");
      })
      .catch(err => console.log(err))
      .finally(() => setUpdating(null));
  };

  const handleReportIssue = (orderId: string) => {
    setUpdating(orderId);
    axios.put(`/api/v1/manager/orders/${orderId}/issue`)
      .then(() => {
        alert("Issue Reported!");
      })
      .catch(err => console.log(err))
      .finally(() => setUpdating(null));
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-primarys)]">Orders by Area</h1>
      <Table className="bg-[var(--color-bgs)] text-[var(--color-texts)]">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.vendor.shopname}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  className="bg-[var(--color-accents)] text-black"
                  onClick={() => handleAssignDelivery(order.id)}
                  disabled={updating === order.id}
                >
                  {updating === order.id ? "Processing..." : "Assign Delivery"}
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 text-white"
                  onClick={() => handleReportIssue(order.id)}
                  disabled={updating === order.id}
                >
                  {updating === order.id ? "Processing..." : "Report Issue"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
