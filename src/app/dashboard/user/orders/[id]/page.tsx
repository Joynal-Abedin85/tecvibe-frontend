"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axioss";

export default function SingleOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = async () => {
    const res = await axios.get(`/api/v1/user/orders/${id}`);
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const trackOrder = async () => {
    const res = await axios.get(`/api/v1/user/orders/${id}/track`);
    alert(`Order Status: ${res.data.status}`);
  };

  const returnOrder = async () => {
    await axios.post(`/api/v1/user/orders/${id}/return`);
    alert("Return request submitted");
  };

  const refundOrder = async () => {
    const res = await axios.get(`/api/v1/user/orders/${id}/refund`);
    alert(`Refund Status: ${res.data.status}`);
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Order #{order._id}</h2>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total}</p>

      <div className="mt-4 flex gap-3">
        <button onClick={trackOrder} className="bg-blue-500 text-white px-3 py-1 rounded">
          Track
        </button>
        <button onClick={returnOrder} className="bg-yellow-500 text-white px-3 py-1 rounded">
          Return
        </button>
        <button onClick={refundOrder} className="bg-red-500 text-white px-3 py-1 rounded">
          Refund
        </button>
      </div>
    </div>
  );
}

