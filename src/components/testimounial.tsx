"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Verified Customer",
    avatar: "https://i.pravatar.cc/100?img=12",
    review:
      "Amazing quality products! Delivery was super fast. I always order from this website. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sara Khan",
    role: "Fashion Buyer",
    avatar: "https://i.pravatar.cc/100?img=32",
    review:
      "Great pricing and fantastic support. The product I bought was exactly as described. Very reliable store!",
    rating: 4,
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    role: "Daily Shopper",
    avatar: "https://i.pravatar.cc/100?img=45",
    review:
      "Loved the discount deals! Packaging was neat and delivery was on time. Will shop again!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[index];

  return (
    <section className="w-full bg-bgs py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold text-texts mb-10">
          What Our Customers Say
        </h2>

        <div className="max-w-3xl mx-auto bg-bgs p-8 rounded-2xl shadow-lg border border-texts transition">
          {/* Avatar */}
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <Image
              src={t.avatar}
              alt={t.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Name */}
          <h3 className="mt-4 text-xl font-semibold text-texts">{t.name}</h3>
          <p className="text-muteds text-sm">{t.role}</p>

          {/* Stars */}
          <div className="flex justify-center gap-1 mt-3">
            {Array(t.rating)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-secondarys text-lg">★</span>
              ))}
            {Array(5 - t.rating)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-muteds text-lg">★</span>
              ))}
          </div>

          {/* Review */}
          <p className="mt-5 text-texts text-base leading-relaxed max-w-xl mx-auto">
            "{t.review}"
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  index === i ? "bg-primarys" : "bg-muteds/40"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
