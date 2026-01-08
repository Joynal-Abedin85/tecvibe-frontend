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
    img: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 1800,
    oldPrice: 3200,
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
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
    img: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vdXNlfGVufDB8fDB8fHww",
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
    <section className="py-12 bg-bgs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bgs">
            Flash Sale
          </h2>

          {/* Timer */}
          <div className="flex items-center gap-2 text-texts font-semibold">
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
              className="group bg-secondarys  rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative h-36 md:h-48">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-gray-700 text-texts text-xs px-2 py-1 rounded-md shadow">
                  -{Math.floor(
                    ((item.oldPrice - item.price) / item.oldPrice) * 100
                  )}
                  %
                </span>
              </div>

              <div className="p-3 space-y-1">
                <p className="font-semibold text-texts text-sm">
                  {item.title}
                </p>

                <p className="text-gray-700 font-bold text-lg">
                  ৳ {item.price}
                </p>

                <p className="line-through text-muteds text-sm">
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
