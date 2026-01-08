"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const brands = [
  // "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhbmQlMjBsb2dvfGVufDB8fDB8fHww",

   "https://images.unsplash.com/photo-1646627928017-969b372e2727?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWklMjBicmFuZCUyMGxvZ28lMjB0ZWNofGVufDB8fDB8fHww",

  "https://images.unsplash.com/photo-1570882280426-df8ac5ccd672?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJhbmQlMjBsb2dvfGVufDB8fDB8fHww",

  "https://images.unsplash.com/photo-1555274175-75f4056dfd05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhbmQlMjBsb2dvfGVufDB8fDB8fHww",

  "https://images.unsplash.com/photo-1622651132634-a7ed1fbb86dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhbmQlMjBsb2dvJTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D",

  "https://images.unsplash.com/photo-1760037028517-e5cc6e3ebd3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhbmQlMjBsb2dvJTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D",

  "https://images.unsplash.com/photo-1662947995643-0007c2b5ebb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2Ftc3VuZyUyMGJyYW5kJTIwbG9nbyUyMHRlY2h8ZW58MHx8MHx8fDA%3D",
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
    <section className="w-full py-12 bg-bgs">
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
              className="flex-shrink-0 w-32 h-20 rounded-xl  flex items-center justify-center hover:shadow-md transition"
            >
              <Image
                src={brand}
                alt="brand logo"
                width={100}
                height={50}
                
                className="object-contain rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
