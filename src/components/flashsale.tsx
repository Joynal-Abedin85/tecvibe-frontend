"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  img: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 1200,
    oldPrice: 2500,
    img: "https://images.unsplash.com/photo-1518442310709-1c1d7a1f724c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 1800,
    oldPrice: 3200,
    img: "https://images.unsplash.com/photo-1517821099609-3445c7ee9934?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: 900,
    oldPrice: 1800,
    img: "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Gaming Mouse",
    price: 650,
    oldPrice: 1200,
    img: "https://images.unsplash.com/photo-1584273143981-41c073dfeeb8?auto=format&fit=crop&w=600&q=80",
  },
];

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 59,
    seconds: 59,
  });

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-[var(--bg,#F8FAFC)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text,#1E293B)]">
            Flash Sale
          </h2>

          {/* Timer */}
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="bg-red-600 px-3 py-1 rounded">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            :
            <span className="bg-red-600 px-3 py-1 rounded">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            :
            <span className="bg-red-600 px-3 py-1 rounded">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative h-36 md:h-48">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow">
                  -{Math.floor(
                    ((item.oldPrice - item.price) / item.oldPrice) * 100
                  )}
                  %
                </span>
              </div>

              <div className="p-3 space-y-1">
                <p className="font-semibold text-[var(--text,#1E293B)] text-sm">
                  {item.title}
                </p>

                <p className="text-red-600 font-bold text-lg">
                  ৳ {item.price}
                </p>

                <p className="line-through text-gray-500 text-sm">
                  ৳ {item.oldPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
