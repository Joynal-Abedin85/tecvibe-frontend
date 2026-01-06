"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authprovider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function HeroBanner() {
  const { user } = useAuth();
  const router = useRouter();

  const handleShopNow = () => {
    if (user) {
      router.push("/products");
    } else {
      router.push("/login");
    }
  };

  // Multiple banner images for slider
  const banners = [
    "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_106176-1647.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-psd/online-shopping-sale-banner-template_23-2149005791.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-vector/flat-sale-banner-template_23-2149334986.jpg?size=626&ext=jpg",
  ];

  return (
    <section className="w-full bg-bgs mt-[-35] py-8 md:py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-texts">
            Shop Smart, Live Better
          </h1>

          <p className="text-lg text-muteds max-w-md mx-auto md:mx-0">
            Get the best deals on electronics, fashion, home essentials & more.
            Everyday low prices—delivered fast.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleShopNow}
              className="px-6 py-4 rounded-xl text-texts text-lg bg-primarys hover:opacity-90 transition"
            >
              Shop Now
            </button>

            <button className="px-6 py-4 rounded-xl text-lg border border-primarys text-primarys hover:bg-primarys hover:text-texts transition">
              Explore Deals
            </button>
          </div>
        </div>

        {/* Right Slider */}
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-lg">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 4000 }}
            className="h-full w-full"
          >
            {banners.map((img, index) => (
              <SwiperSlide key={index} className="relative h-full w-full">
                <Image
                  src={img}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover rounded-3xl"
                  priority={index === 0} // first slide prioritized
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

