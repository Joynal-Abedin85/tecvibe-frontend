"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

export default function VendorProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/vendors/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Link href="/dashboard/vendor/products/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img src={p.image} className="h-40 w-full rounded object-cover" />
            <h2 className="mt-2 font-bold">{p.name}</h2>
            <p className="text-gray-600">৳{p.price}</p>

            <Link
              href={`/dashboard/vendor/products/${p.id}`}
              className="mt-3 inline-block px-4 py-2 bg-black text-white rounded"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
