"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface ProductListProps {
  title: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 89,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 129,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    rating: 4.2,
  },
  {
    id: "3",
    name: "DSLR Camera",
    price: 499,
    image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e",
    rating: 4.7,
  },
  {
    id: "4",
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1695048133624-71bc133c1d44",
    rating: 4.9,
  },
];

export default function ProductList({ title }: ProductListProps) {
  return (
    <section className="w-full py-10 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            {title}
          </h2>
          <Link
            href="/products"
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              {/* Image */}
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="mt-3 text-[var(--color-text)] font-semibold line-clamp-1">
                {product.name}
              </h3>

              {/* Rating */}
              <p className="text-sm text-yellow-500 mt-1">⭐ {product.rating}</p>

              {/* Price */}
              <p className="mt-2 text-lg font-bold text-[var(--color-primary)]">
                ${product.price}
              </p>

              {/* Button */}
              <button className="mt-4 w-full py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 text-sm font-medium">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
