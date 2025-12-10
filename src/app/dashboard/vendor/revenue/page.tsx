// src/app/dashboard/vendor/revenue/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

type Item = { label: string; value: number };

export default function VendorRevenuePage() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/v1/vendor/revenue");
        const payload = res.data?.data ?? res.data;
        const arr: Item[] = Array.isArray(payload) ? payload : [];
        setData(arr);
        setTotal(arr.reduce((s, it) => s + it.value, 0));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const width = 700;
  const height = 260;
  const padding = 28;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Revenue (Period)</h1>

      {loading ? (
        <div>Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-gray-600">No revenue data.</div>
      ) : (
        <div className="bg-white border rounded shadow p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold">৳ {total}</div>
            </div>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56">
            {data.map((d, i) => {
              const barWidth = (width - padding * 2) / data.length - 8;
              const x = padding + i * (barWidth + 8);
              const barHeight = (d.value / max) * (height - padding * 2);
              const y = height - padding - barHeight;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="#059669"
                    rx={4}
                    ry={4}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={height - padding + 14}
                    fontSize="11"
                    fill="#374151"
                    textAnchor="middle"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {data.slice(0, 8).map((d, i) => (
              <div key={i} className="text-sm">
                <div className="font-medium">{d.label}</div>
                <div className="text-xs text-gray-600">৳ {d.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
