"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

type Brand = { id: string; name: string; createdAt?: string; logo?: string; description?: string; };

export default function BrandsListPage() {
  const [items, setItems] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/brands");
      const payload = res.data?.data ?? res.data;
      setItems(Array.isArray(payload) ? payload : []);
    } catch (e) {
      console.error(e);
      setErr("Could not load brands.");
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchBrands(); }, []);

  const filtered = items.filter(b => b.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primarys)]">Brands</h1>
          <p className="text-sm text-[var(--color-muteds)]">Manage brands and logos</p>
        </div>

        <div className="flex gap-3">
          <input className="border p-2 rounded w-72" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search brands..." />
          <Link href="/dashboard/admin/brands/new" className="px-4 py-2 rounded bg-[var(--color-accents)] text-[var(--color-texts)]">New Brand</Link>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      ) : err ? (
        <div className="text-red-600">{err}</div>
      ) : (
        <div className="bg-white border rounded shadow overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[var(--color-bgs)] text-[var(--color-texts)]">
              <tr>
                <th className="p-3 text-left">Brand</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center text-[var(--color-muteds)]">No brands found.</td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-3 flex items-center gap-3">
                    {b.logo ? <img src={b.logo} alt={b.name} className="h-8 w-8 object-cover rounded" /> : <div className="h-8 w-8 bg-gray-100 rounded" />}
                    <div>{b.name}</div>
                  </td>
                  <td className="p-3 hidden lg:table-cell text-sm text-gray-600">{b.description ?? "-"}</td>
                  <td className="p-3 text-sm">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="p-3 text-right">
                    <Link href={`/dashboard/admin/brands/${b.id}`} className="px-3 py-1 rounded bg-[var(--color-primarys)] text-white">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
