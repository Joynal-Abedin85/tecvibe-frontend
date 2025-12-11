"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

export default function ManagersListPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/managers");
      setItems(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (e) {
      setErr("Failed to load managers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const filtered = items.filter((m) =>
    m.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primarys)]">
            Managers
          </h1>
          <p className="text-sm text-[var(--color-muteds)]">
            Manage admin managers
          </p>
        </div>

        <div className="flex gap-3">
          <input
            placeholder="Search manager..."
            className="border p-2 rounded w-64"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <Link
            href="/dashboard/admin/managers/new"
            className="px-4 py-2 rounded bg-[var(--color-accents)] text-white"
          >
            New Manager
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      )}

      {/* Error */}
      {err && <div className="text-red-600">{err}</div>}

      {/* Table */}
      {!loading && !err && (
        <div className="bg-white border rounded shadow overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[var(--color-bgs)] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left hidden md:table-cell">Phone</th>
                <th className="p-3 text-left hidden lg:table-cell">Created</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3 hidden md:table-cell">{m.phone}</td>
                  <td className="p-3 hidden lg:table-cell">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/dashboard/admin/managers/${m.id}`}
                      className="px-3 py-1 bg-[var(--color-primarys)] text-white rounded"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-[var(--color-muteds)]"
                  >
                    No managers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
