"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { useParams } from "next/navigation";

type Vendor = {
  id: string;
  shopname: string;
  status: "PENDING" | "APPROVED" | "SUSPENDED";
  area?: string;
  updatedat: string;
  User: {
    name: string;
    email: string;
    createdat: string;
  };
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
      const res = await axios.get(`/api/v1/admin/vendors/${id}`);
      setVendor(res.data?.data ?? null);
    } catch {
      setErr("Failed to load vendor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const suspendVendor = async () => {
    if (!confirm("Are you sure you want to suspend this vendor?")) return;

    try {
      setProcessing(true);
      await axios.put(`/api/v1/admin/vendors/${id}/suspend`);
      await fetchData();
    } catch {
      alert("Failed to suspend vendor");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return <div className="p-6 animate-pulse">Loading vendor...</div>;

  if (!vendor)
    return <div className="p-6 text-red-600">Vendor not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Vendor Details</h1>

      {err && <p className="text-red-600">{err}</p>}

      <div className="bg-white rounded shadow p-5 space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">{vendor.shopname}</h2>
          <p className="text-sm text-gray-500">
            Owner: {vendor.User.name}
          </p>
        </div>

        {/* Info */}
        <div className="text-sm space-y-1">
          <p>
            <strong>Email:</strong> {vendor.User.email}
          </p>
          <p>
            <strong>Area:</strong> {vendor.area ?? "N/A"}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(vendor.User.createdat).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(vendor.updatedat).toLocaleDateString()}
          </p>
        </div>

        {/* Status */}
        <span
          className={`inline-block px-3 py-1 text-sm rounded font-medium ${
            vendor.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : vendor.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {vendor.status}
        </span>

        {/* Action */}
        {vendor.status !== "SUSPENDED" && (
          <button
            disabled={processing}
            onClick={suspendVendor}
            className="block w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Suspend Vendor
          </button>
        )}
      </div>
    </div>
  );
}
