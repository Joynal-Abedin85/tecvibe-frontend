"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard Home", href: "/dashboard/manager" },
    { name: "Products", href: "/dashboard/manager/products" },
    { name: "Orders", href: "/dashboard/manager/orders" },
    { name: "Vendors", href: "/dashboard/manager/vendors" },
    { name: "Support Tickets", href: "/dashboard/manager/support-tickets" },
    { name: "Chat", href: "/dashboard/manager/chat" },
  ];

  return (
    <aside className="w-64 bg-[var(--color-primarys)] text-[var(--color-texts)] min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-4 py-2 rounded hover:bg-[var(--color-secondarys)] ${
                pathname === link.href ? "bg-[var(--color-accents)] text-black" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
