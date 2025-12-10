// src/app/dashboard/vendor/order-performance/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

type Perf = {
  metric: string;
  value: number; // percent 0-100
  description?: string;
};

export default function VendorOrderPerformance() {
  const [metrics, setMetrics] = useState<Perf[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/v1/vendor/order-performance");
        const payload = res.data?.data ?? res.data;
        setMetrics(Array.isArray(payload) ? payload : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Performance</h1>

      {loading ? (
        <div>Loading...</div>
      ) : metrics.length === 0 ? (
        <div className="text-gray-600">No performance data.</div>
      ) : (
        <div className="space-y-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white border rounded p-4">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{m.metric}</div>
                <div className="text-sm text-gray-600">{m.value}%</div>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded">
                <div
                  className="h-3 rounded bg-blue-600"
                  style={{ width: `${Math.max(0, Math.min(100, m.value))}%` }}
                />
              </div>
              {m.description && <div className="text-sm text-gray-500 mt-2">{m.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
