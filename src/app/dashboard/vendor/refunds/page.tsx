"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardContent } from "@/components/ui/card";

export default function VendorRefundsPage() {
  const [refunds, setRefunds] = useState<any[]>([]);

  const fetchRefunds = async () => {
    const res = await axios.get("/api/v1/vendors/refunds");
    setRefunds(res.data.data);
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">Refund Requests</h2>

      <div className="space-y-4">
        {refunds.map((item) => (
          <Card key={item._id}>
            <CardContent className="py-4 space-y-2">
              <p><strong>Order ID:</strong> {item.orderId}</p>
              <p><strong>Product:</strong> {item.product.name}</p>
              <p><strong>Refund Amount:</strong> ${item.amount}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
