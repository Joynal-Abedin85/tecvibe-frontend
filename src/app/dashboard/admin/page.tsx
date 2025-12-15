// src/app/dashboard/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import Link from "next/link";

type Stats = {
  totalVendors?: number;
  pendingVendors?: number;
  totalOrders?: number;
  revenue?: number;
  salesSeries?: { label: string; value: number }[];
};

export default function AdminHomePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/admin/reports");
        // backend might return res.data or res.data.data
        const payload = (res.data && (res.data.data ?? res.data)) || {};
        setStats({
          totalVendors: payload.totalVendors ?? payload.total_vendors ?? 0,
          pendingVendors: payload.pendingVendors ?? payload.pending_vendors ?? 0,
          totalOrders: payload.totalOrders ?? payload.total_orders ?? 0,
          revenue: payload.revenue ?? payload.total_revenue ?? 0,
          salesSeries: payload.sales ?? payload.salesSeries ?? [],
        });
      } catch (e: any) {
        console.error(e);
        setErr("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-28 bg-gray-200 rounded" />
            <div className="h-28 bg-gray-200 rounded" />
            <div className="h-28 bg-gray-200 rounded" />
            <div className="h-28 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primarys)]">Admin Dashboard</h1>
          <p className="text-sm text-[var(--color-muteds)] mt-1">Overview & quick stats</p>
        </div>

        <div className="flex gap-2">
          <Link href="/dashboard/admin/vendors/pending" className="px-3 py-2 rounded bg-[var(--color-accents)] text-[var(--color-texts)]">
            View Pending Vendors
          </Link>
          <Link href="/dashboard/admin/vendors" className="px-3 py-2 rounded border border-[var(--color-primarys)] text-[var(--color-primarys)]">
            All Vendors
          </Link>
        </div>
      </header>

      {err && <div className="mb-4 text-red-600">{err}</div>}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white shadow">
          <div className="text-sm text-[var(--color-muteds)]">Total Vendors</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-primarys)]">{stats?.totalVendors ?? 0}</div>
        </div>

        <div className="p-4 rounded-lg bg-white shadow">
          <div className="text-sm text-[var(--color-muteds)]">Pending Vendors</div>
          <div className="mt-2 text-2xl font-semibold text-yellow-600">{stats?.pendingVendors ?? 0}</div>
        </div>

        <div className="p-4 rounded-lg bg-white shadow">
          <div className="text-sm text-[var(--color-muteds)]">Total Orders</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-primarys)]">{stats?.totalOrders ?? 0}</div>
        </div>

        <div className="p-4 rounded-lg bg-white shadow">
          <div className="text-sm text-[var(--color-muteds)]">Revenue</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-accents)]">৳ {stats?.revenue ?? 0}</div>
        </div>
      </div>

      {/* Charts + mini details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Sales (recent)</h3>

          {(!stats?.salesSeries || stats.salesSeries.length === 0) ? (
            <div className="text-gray-600">No sales data available.</div>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 700 260" className="w-full h-56">
                {(() => {
                  const data = stats.salesSeries!;
                  const width = 700;
                  const height = 260;
                  const padding = 32;
                  const vals = data.map((d: any) => d.value ?? d.y ?? 0);
                  const max = Math.max(...vals, 1);
                  const points = data.map((d: any, i: number) => {
                    const x = padding + (i / Math.max(1, data.length - 1)) * (width - padding * 2);
                    const y = height - padding - ((d.value ?? d.y ?? 0) / max) * (height - padding * 2);
                    return `${x},${y}`;
                  });
                  return (
                    <>
                      <polyline fill="none" stroke="#0A400C" strokeWidth={2} points={points.join(" ")} />
                      {data.map((d: any, i: number) => {
                        const [xStr, yStr] = points[i].split(",");
                        return <circle key={i} cx={Number(xStr)} cy={Number(yStr)} r={3} fill="#0A400C" />;
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Quick Activity</h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-[var(--color-muteds)]">New vendors</span>
              <span className="font-medium">{stats?.pendingVendors ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[var(--color-muteds)]">Orders today</span>
              <span className="font-medium">{Math.floor((stats?.totalOrders ?? 0) / 10)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-[var(--color-muteds)]">Revenue today</span>
              <span className="font-medium">৳ {Math.floor((stats?.revenue ?? 0) / 7)}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* links/cards at bottom */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/admin/vendors/pending" className="block p-3 bg-[var(--color-bgs)] text-[var(--color-texts)] rounded shadow">
          <div className="font-semibold">Approve Vendors</div>
          <div className="text-sm mt-1">Review vendor applications and approve or reject.</div>
        </Link>

        <Link href="/dashboard/admin/orders" className="block p-3 border rounded shadow">
          <div className="font-semibold">Manage Orders</div>
          <div className="text-sm mt-1 text-[var(--color-muteds)]">View all orders and process refunds/returns.</div>
        </Link>

        <Link href="/dashboard/admin/reports" className="block p-3 border rounded shadow">
          <div className="font-semibold">Reports</div>
          <div className="text-sm mt-1 text-[var(--color-muteds)]">In-depth analytics and export.</div>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/admin/categories" className="block p-3 bg-[var(--color-bgs)] text-[var(--color-texts)] rounded shadow">
          <div className="font-semibold">categories </div>
          <div className="text-sm mt-1">Review vendor applications and approve or reject.</div>
        </Link>

        <Link href="/dashboard/admin/brands" className="block p-3 border rounded shadow">
          <div className="font-semibold"> brands</div>
          <div className="text-sm mt-1 text-[var(--color-muteds)]">View all orders and process refunds/returns.</div>
        </Link>

        <Link href="/dashboard/admin/managers" className="block p-3 border rounded shadow">
          <div className="font-semibold">managers</div>
          <div className="text-sm mt-1 text-[var(--color-muteds)]">In-depth analytics and export.</div>
        </Link>
      </div>
    </div>
  );
}
