"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  sold: number;
  rating: number;
}

const topSelling: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Headphones",
    price: 349,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    sold: 1200,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Apple Watch Series 9",
    price: 399,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    sold: 950,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Canon EOS R8 Camera",
    price: 1599,
    image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e",
    sold: 780,
    rating: 4.8,
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    image: "https://images.unsplash.com/photo-1695048133624-71bc133c1d44",
    sold: 1430,
    rating: 4.9,
  },
];

export default function TopSelling() {
  return (
    <section className="w-full py-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text">
            Top Selling Products
          </h2>

          <Link
            href="/top-selling"
            className="text-primary font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {topSelling.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
            >
              {/* Product Image */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Product Name */}
              <h3 className="mt-3 font-semibold text-text text-sm md:text-base line-clamp-2">
                {item.name}
              </h3>

              {/* Ratings */}
              <p className="text-sm text-yellow-500 mt-1">
                ⭐ {item.rating} | {item.sold}+ sold
              </p>

              {/* Price */}
              <p className="mt-2 text-lg md:text-xl font-bold text-primary">
                ${item.price}
              </p>

              {/* Button */}
              <button className="mt-4 w-full py-2 bg-primary text-white rounded-xl hover:opacity-90 text-sm font-medium">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
