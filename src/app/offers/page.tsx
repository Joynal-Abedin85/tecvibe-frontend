"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ------------------ TYPES ------------------
type Deal = {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  tag: string;
};

// ------------------ MOCK DATA ------------------
const deals: Deal[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 2499,
    oldPrice: 3999,
    discount: 38,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWCTHBL7oZdmr1qbrt39TwPmKpHQXNmwAUw&s",
    tag: "Flash Sale",
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    price: 3299,
    oldPrice: 4999,
    discount: 34,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBhJRi4kHgflEjtQsoO0EsAl1AtCPoVwdZA&s",
    tag: "Hot Deal",
  },
  {
    id: 3,
    title: "Gaming Mouse RGB",
    price: 999,
    oldPrice: 1599,
    discount: 37,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjrrXkT5A2wE7dKfCcWhEdiEbyy1OcFVAE2A&s",
    tag: "Best Seller",
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    price: 1899,
    oldPrice: 2899,
    discount: 35,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAsIP3Jit63XbBo89K0_li2ZnDE5Pr4PqF0Q&s",
    tag: "Limited Offer",
  },
];

// ------------------ BANNER DATA ------------------
const banners = [
  {
    id: 1,
    title: "Mega Flash Sale",
    subtitle: "Up to 60% OFF",
    image: "https://static.vecteezy.com/system/resources/thumbnails/049/748/169/small/3d-black-friday-big-sale-discount-template-banner-with-blank-space-3d-podium-for-product-sale-with-abstract-gradient-red-background-design-free-vector.jpg",
  },
  {
    id: 2,
    title: "Electronics Deals",
    subtitle: "Best prices this week",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 3,
    title: "Fashion Festival",
    subtitle: "Trending styles on sale",
    image: "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-118763.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

export default function OffersDealsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredDeals = filter === "All" ? deals : deals.filter(d => d.tag === filter);

  return (
    <div className="min-h-screen  px-4 py-8 md:px-10">
      {/* Banner Slider */}
      <div className="mb-10 overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          {[...banners, ...banners].map(banner => (
            <div
              key={banner.id + Math.random()}
              className="relative min-w-full h-[180px] sm:h-[260px] md:h-[320px]"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="px-6 md:px-12 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold">{banner.title}</h2>
                  <p className="mt-2 text-sm md:text-lg">{banner.subtitle}</p>
                  <Button className="mt-4 rounded-xl bg-orange-500 hover:bg-orange-600">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>


     <div className="min-h-screen rounded-2xl bg-gray-50 px-4 py-8 md:px-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">🔥 Offers & Deals</h1>
        <p className="mt-2 text-gray-600">Grab the best deals before they're gone</p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {["All", "Flash Sale", "Hot Deal", "Best Seller", "Limited Offer"].map(tag => (
          <Button
            key={tag}
            variant={filter === tag ? "default" : "outline"}
            onClick={() => setFilter(tag)}
            className="rounded-full"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredDeals.map(deal => (
          <motion.div
            key={deal.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                  -{deal.discount}%
                </span>
              </div>

              <CardContent className="p-4">
                <h3 className="line-clamp-1 font-semibold text-gray-900">{deal.title}</h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">৳{deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">৳{deal.oldPrice}</span>
                </div>

                <Button className="mt-4 w-full rounded-xl">Add to Cart</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
     </div>
    </div>
  );
}
