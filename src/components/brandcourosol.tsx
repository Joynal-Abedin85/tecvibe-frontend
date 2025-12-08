"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const brands = [
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/21/Samsung_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/35/Adidas_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Nike_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/26/Sony_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/HP_logo_2012.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Xiaomi_Logo.svg",
];

export default function BrandCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;

    const slide = () => {
      if (!slider) return;
      scrollAmount += 1;
      slider.scrollLeft = scrollAmount;

      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0; // reset for infinite loop
      }
    };

    const interval = setInterval(slide, 20); // speed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">
          Featured Brands
        </h2>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll no-scrollbar gap-10 py-4"
        >
          {/* Duplicate items for infinite loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-center hover:shadow-md transition"
            >
              <Image
                src={brand}
                alt="brand logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
