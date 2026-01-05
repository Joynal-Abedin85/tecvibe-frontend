"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function VendorOrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    const res = await axios.get(`/api/v1/vendor/orders/${id}`);
    setOrder(res.data.data);
    setStatus(res.data.data);
  };

  console.log("order", order);
  console.log("status", status);

  const updateStatus = async () => {
    await axios.put(`/api/v1/vendor/orders/${id}/status`, { status });
    fetchOrder();
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <Card className="mb-4">
        <CardContent className="space-y-2 py-4">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Customer:</strong> {order.user?.name}
          </p>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          <p>
            <strong>Current Status:</strong> {order.status}
          </p>

          <div className="my-4">
            <label className="font-semibold">Update Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="PICKED">Picked</SelectItem>
                <SelectItem value="ON_THE_WAY">On the way</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={updateStatus} className="mt-3 w-full">
              Update Status
            </Button>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mb-2">Items</h3>
      <Card>
        <CardContent className="py-4 space-y-2">
          {order.OrderItem.map((item: any) => (
            <div key={item.productId} className="border p-2 rounded">
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
