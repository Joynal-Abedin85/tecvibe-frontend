"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { useParams } from "next/navigation";

type Vendor = {
  id: string;
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
};

export default function VendorDetailsPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/vendors/${id}`);
      setVendor(res.data?.data ?? null);
    } catch (e) {
      setErr("Failed to load vendor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const doAction = async (action: "approve" | "reject" | "suspend") => {
    if (!confirm(`Are you sure you want to ${action} this vendor?`)) return;

    try {
      setProcessing(true);
      await axios.put(`/api/admin/vendors/${id}/${action}`);
      await fetchData();
    } catch (error) {
      alert("Action failed!");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return <div className="p-6 text-gray-600 animate-pulse">Loading vendor...</div>;

  if (!vendor)
    return <div className="p-6 text-red-600">Vendor not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">
        Vendor Details
      </h1>

      {err && <p className="text-red-600">{err}</p>}

      <div className="bg-white shadow rounded p-4 space-y-3">
        <div>
          <h2 className="text-xl font-semibold">{vendor.shopName}</h2>
          <p className="text-[var(--color-muteds)] text-sm">
            Owner: {vendor.ownerName}
          </p>
        </div>

        <div className="text-sm space-y-1">
          <p>
            <strong>Email:</strong> {vendor.email}
          </p>
          <p>
            <strong>Phone:</strong> {vendor.phone}
          </p>
          <p>
            <strong>Address:</strong> {vendor.address}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(vendor.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <span
            className={`px-3 py-1 text-sm rounded ${
              vendor.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : vendor.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {vendor.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            disabled={processing}
            onClick={() => doAction("approve")}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Approve
          </button>

          <button
            disabled={processing}
            onClick={() => doAction("reject")}
            className="px-3 py-2 bg-red-600 text-white rounded"
          >
            Reject
          </button>

          <button
            disabled={processing}
            onClick={() => doAction("suspend")}
            className="px-3 py-2 bg-yellow-600 text-white rounded"
          >
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
}
