"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { useParams } from "next/navigation";

export default function SingleOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/orders/${id}`);
      setOrder(res.data?.data ?? null);
    } catch (error) {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6 text-red-600">Order not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)]">
        Order #{order?.orderId}
      </h1>

      <div className="bg-white p-5 rounded shadow space-y-3">
        <p>
          <strong>Customer: </strong> {order?.customer?.name ?? "Unknown"}
        </p>
        <p>
          <strong>Status: </strong> {order?.status}
        </p>
        <p>
          <strong>Total: </strong> ${order?.totalAmount}
        </p>
        <p>
          <strong>Date: </strong>{" "}
          {order?.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "N/A"}
        </p>
      </div>

      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Items</h2>

        <div className="space-y-3">
          {(order?.items ?? []).map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item?.productName}</p>
                <p className="text-sm text-gray-600">Qty: {item?.qty}</p>
              </div>

              <div>${(item?.price ?? 0) * (item?.qty ?? 1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
