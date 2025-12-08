"use client";

import Image from "next/image";

const categories = [
  {
    title: "Electronics",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Fashion",
    img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Home Essentials",
    img: "https://images.unsplash.com/photo-1616627797445-5f3e000ec6b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Mobile Phones",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Beauty Products",
    img: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Groceries",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-10 bg-bgs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-texts mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group cursor-pointer rounded-xl shadow hover:shadow-lg bg-secondarys transition overflow-hidden border border-texts"
            >
              <div className="relative h-24 md:h-32 w-full">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>

              <div className="p-2 md:p-3 text-center">
                <p className="text-sm md:text-base font-medium text-texts">
                  {cat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
