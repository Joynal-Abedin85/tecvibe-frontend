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
    image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
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
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHNsciUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
    sold: 780,
    rating: 4.8,
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Ftc3VuZyUyMHMyNHVsdHJhfGVufDB8fDB8fHww",
    sold: 1430,
    rating: 4.9,
  },
];

export default function TopSelling() {
  return (
    <section className="w-full py-12 bg-bgs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-texts">
            Top Selling Products
          </h2>

          <Link
            href="/top-selling"
            className="text-primarys font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {topSelling.map((item) => (
            <div
              key={item.id}
              className="bg-texts rounded-2xl p-4 shadow-sm border border-texts hover:shadow-lg transition-all group"
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
              <h3 className="mt-3 font-semibold text-texts text-sm md:text-base line-clamp-2">
                {item.name}
              </h3>

              {/* Ratings */}
              <p className="text-sm text-yellow-500 mt-1">
                ⭐ {item.rating} | {item.sold}+ sold
              </p>

              {/* Price */}
              <p className="mt-2 text-lg md:text-xl font-bold text-primarys">
                ${item.price}
              </p>

              {/* Button */}
              <button className="mt-4 w-full py-2 bg-primarys text-texts rounded-xl hover:opacity-90 text-sm font-medium">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
