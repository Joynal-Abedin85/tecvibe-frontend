// src/app/dashboard/vendor/inventory-status/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

type Item = {
  id: string;
  name: string;
  sku?: string;
  stock: number;
  price?: number;
};

export default function VendorInventoryStatusPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/v1/vendors/inventory-status");
        const payload = res.data?.data ?? res.data;
        setItems(Array.isArray(payload) ? payload : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Status</h1>

      {loading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">No products found.</div>
      ) : (
        <div className="bg-white border rounded shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b">
                  <td className="p-3">{it.name}</td>
                  <td className="p-3">{it.sku ?? "-"}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <span>{it.stock}</span>
                      {it.stock < 5 && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Low
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">৳{it.price ?? "—"}</td>
                  <td className="p-3">
                    {it.stock > 0 ? (
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">In stock</span>
                    ) : (
                      <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-sm">Out</span>
                    )}
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
