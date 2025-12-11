"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import Link from "next/link";

type Vendor = {
  id: string;
  shopname: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function AllVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/manager/vendors");
      setVendors(res.data?.data ?? []);
    } catch (error) {
      console.log(error);
      setErr("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = vendors.filter(
    (v) =>
      v.shopname.toLowerCase().includes(search.toLowerCase()) ||
      v.user.name.toLowerCase().includes(search.toLowerCase()) ||
      v.user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4 max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
          <div className="h-6 bg-gray-200 w-full rounded"></div>
          <div className="h-6 bg-gray-200 w-full rounded"></div>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">
        All Vendors
      </h1>

      {err && <p className="text-red-600 mb-4">{err}</p>}

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={search}
          placeholder="Search vendors..."
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-[var(--color-bgs)] text-[var(--color-texts)]">
            <tr>
              <th className="p-3 text-left">Shop</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No vendors found
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="p-3">{v.shopname}</td>
                  <td className="p-3">{v.user.name}</td>
                  <td className="p-3">{v.user.email}</td>
                  <td className="p-3">{v.user.phone}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        v.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : v.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/dashboard/admin/vendors/${v.id}`}
                      className="px-3 py-1 rounded bg-[var(--color-primarys)] text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
