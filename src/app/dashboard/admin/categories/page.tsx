"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

type Category = {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  createdAt?: string;
};

export default function CategoriesListPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/categories");
      const payload = res.data?.data ?? res.data;
      setItems(Array.isArray(payload) ? payload : []);
    } catch (e) {
      console.error(e);
      setErr("Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = items.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      (c.slug ?? "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primarys)]">Categories</h1>
          <p className="text-sm text-[var(--color-muteds)]">Manage product categories</p>
        </div>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-72"
            placeholder="Search categories..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Link href="/dashboard/admin/categories/new" className="px-4 py-2 rounded bg-[var(--color-accents)] text-[var(--color-texts)]">
            New Category
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-200 rounded" />
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
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left hidden md:table-cell">Slug</th>
                <th className="p-3 text-left hidden lg:table-cell">Description</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-[var(--color-muteds)]">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3 hidden md:table-cell">{c.slug ?? "-"}</td>
                    <td className="p-3 hidden lg:table-cell text-sm text-gray-600">{c.description ?? "-"}</td>
                    <td className="p-3 text-sm">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="p-3 text-right">
                      <Link href={`/dashboard/admin/categories/${c.id}`} className="px-3 py-1 rounded bg-[var(--color-primarys)] text-white">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
