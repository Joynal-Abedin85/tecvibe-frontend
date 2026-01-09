// src/app/dashboard/admin/vendors/pending/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { toast } from "sonner";

type Vendor = {
  id: string;
  shopname: string;
  status: string;
  createdAt: string;
  area?: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function PendingVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Fetch pending vendors
  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/vendors/pending");
      console.log(res.data.vendors)
      const payload = res.data?.vendors ?? res.data;
      setVendors(Array.isArray(payload) ? payload : []);
    } catch (e: any) {
      console.error(e);
      setErr("Failed to fetch pending vendors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // Approve vendor
  const handleApprove = async (id: string) => {
    if (!confirm("Approve this vendor?")) return;
    try {
      setProcessing(id);
      await axios.put(`/api/v1/admin/vendors/${id}/approve`);
      await fetchPending();
    } catch (err) {
      toast.error("Approve failed");
    } finally {
      setProcessing(null);
    }
  };

  // Reject vendor
  const handleReject = async (id: string) => {
    if (!confirm("Reject this vendor?")) return;
    try {
      setProcessing(id);
      await axios.put(`/api/v1/admin/vendors/${id}/reject`);
      await fetchPending();
    } catch (err) {
      toast.error("Reject failed");
    } finally {
      setProcessing(null);
    }
  };

  if (loading)
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 mb-4 rounded" />
          <div className="space-y-2">
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">
        Pending Vendor Applications
      </h1>

      {err && <div className="text-red-600 mb-4">{err}</div>}

      {vendors.length === 0 ? (
        <div className="text-gray-600">No pending vendors.</div>
      ) : (
        <div className="space-y-3">
          {vendors.map((v) => (
            <div
              key={v.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border rounded bg-white shadow"
            >
              <div>
                <div className="font-semibold text-lg">{v.shopname}</div>
                <div className="text-sm text-[var(--color-muteds)]">
                  {v.user?.name ?? v.user?.email}
                </div>
                <div className="text-xs text-gray-500 mt-1">{v.area}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Applied: {v.createdAt ? new Date(v.createdAt).toLocaleString() : "-"}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={processing === v.id}
                  onClick={() => handleApprove(v.id)}
                  className="px-3 py-2 rounded bg-[var(--color-accents)] text-[var(--color-texts)]"
                >
                  {processing === v.id ? "Processing..." : "Approve"}
                </button>

                <button
                  disabled={processing === v.id}
                  onClick={() => handleReject(v.id)}
                  className="px-3 py-2 rounded bg-red-600 text-white"
                >
                  {processing === v.id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
