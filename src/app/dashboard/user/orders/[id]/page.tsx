"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axioss";
import { toast } from "sonner";

export default function SingleOrderPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/user/orders/${id}`).then((res) => {
      setOrder(res.data.data);
    });
  }, [id]);

  if (!order) return <p className="text-center mt-10">Loading...</p>;

  // 🔹 status logic
  const isDelivered = order.status === "DELIVERED";
  const isRejectedOrFailed =
    order.status === "REJECTED" || order.status === "FAILED";

  const canCancel = !isDelivered && !isRejectedOrFailed;

  // 🔹 handlers
  const returnOrder = async () => {
    await axios.post(`/api/v1/user/orders/${id}/return`);
    toast.success("Return request submitted");
  };

  const refundOrder = async () => {
    const res = await axios.get(`/api/v1/user/orders/${id}/refund`);
    toast.success(`Refund Status: ${res.data.status}`);
  };

  const cancelOrder = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/v1/user/orders/${id}/cancel`);
      toast.success("Order cancelled successfully");
      router.push("/orders"); // redirect after delete
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* ================= Order Page ================= */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h2 className="text-xl font-bold mb-2">
          Order #{order.id.slice(0, 8)}
        </h2>

        <p className="mb-1">
          <span className="font-medium">Status:</span>{" "}
          <span className="capitalize">{order.status}</span>
        </p>

        <p className="mb-4">
          <span className="font-medium">Total:</span> ৳{order.total}
        </p>

        {/* 🔘 Action Buttons */}
        {!isRejectedOrFailed && (
          <div className="flex gap-3">
            {isDelivered && (
              <>
                <button
                  onClick={returnOrder}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Return
                </button>

                <button
                  onClick={refundOrder}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Refund
                </button>
              </>
            )}

            {canCancel && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-gray-800 text-white px-4 py-1 rounded"
              >
                Cancel Order
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= Confirm Modal ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[350px] shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Confirm Cancellation
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to cancel this order?  
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 border rounded"
                disabled={loading}
              >
                No
              </button>

              <button
                onClick={cancelOrder}
                disabled={loading}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
