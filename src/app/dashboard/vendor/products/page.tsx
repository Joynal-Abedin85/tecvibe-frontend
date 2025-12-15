"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  status: string;
}

export default function VendorProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/v1/vendor/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Link
          href="/dashboard/vendor/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow">
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full rounded object-cover mb-2"
              />
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-gray-600">৳{p.price}</p>
              <p className="text-sm text-gray-500">Status: {p.status}</p>

              <Link
                href={`/dashboard/vendor/products/${p.id}`}
                className="mt-3 inline-block px-4 py-2 bg-black text-white rounded"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

