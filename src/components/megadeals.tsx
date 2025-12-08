"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const deals = [
  {
    id: 1,
    title: "Wireless Headphones",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231634?w=600&q=80",
    oldPrice: 3200,
    newPrice: 1890,
  },
  {
    id: 2,
    title: "Smart Watch",
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    oldPrice: 4500,
    newPrice: 2890,
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80",
    oldPrice: 1800,
    newPrice: 1199,
  },
  {
    id: 4,
    title: "Gaming Keyboard",
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b9b0?w=600&q=80",
    oldPrice: 2500,
    newPrice: 1599,
  },
];

export default function MegaDeals() {
  const [counter, setCounter] = useState(7200); // 2 hours example

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}h : ${m}m : ${s}s`;
  };

  return (
    <section className="w-full py-12 bg-bgs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-texts">
            Mega Deals of the Day
          </h2>

          {/* Timer */}
          <div className="px-4 py-2 rounded-lg bg-primarys text-texts text-sm md:text-base font-medium">
            Ends in: {formatTime(counter)}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {deals.map((item) => {
            const discount =
              Math.round(((item.oldPrice - item.newPrice) / item.oldPrice) * 100);

            return (
              <div
                key={item.id}
                className="bg-bgs rounded-xl shadow-md p-4 hover:shadow-lg transition border border-accents"
              >
                <div className="relative w-full h-32 sm:h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="font-semibold text-texts text-sm sm:text-base mb-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-primarys font-bold text-lg">
                    ৳{item.newPrice}
                  </span>
                  <span className="line-through text-muteds text-sm">
                    ৳{item.oldPrice}
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="mt-2 w-max bg-secondarys text-texts text-xs font-bold px-2 py-1 rounded">
                  -{discount}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
