"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardContent } from "@/components/ui/card";

export default function VendorReturnsPage() {
  const [returns, setReturns] = useState<any[]>([]);

  const fetchReturns = async () => {
    const res = await axios.get("/api/v1/vendors/returns");
    setReturns(res.data.data);
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">Return Requests</h2>

      <div className="space-y-4">
        {returns.map((item) => (
          <Card key={item._id}>
            <CardContent className="py-4 space-y-2">
              <p><strong>Order ID:</strong> {item.orderId}</p>
              <p><strong>Product:</strong> {item.product.name}</p>
              <p><strong>Reason:</strong> {item.reason}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
