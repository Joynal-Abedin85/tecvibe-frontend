"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/shop/products").then((res) => setProducts(res.data.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
      {products?.map((product: any) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <img
            src={product.productimages[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="h-40 w-full object-cover mb-2 rounded"
          />
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
}
