"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ------------------ TYPES ------------------
type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
};

// ------------------ MOCK BLOG DATA ------------------
const blogs: Blog[] = [
  {
    id: 1,
    title: "Top 10 Gadgets to Buy in 2026",
    excerpt: "Discover the most trending gadgets you should not miss this year.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "Technology",
    date: "Jan 12, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Save Money While Shopping Online",
    excerpt: "Smart tips and tricks to get the best deals from e-commerce platforms.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Shopping Tips",
    date: "Jan 10, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Best Fashion Trends This Season",
    excerpt: "Explore the latest fashion styles that are dominating the market.",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    category: "Fashion",
    date: "Jan 08, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Why Flash Sales Are So Popular",
    excerpt: "Understanding the psychology behind flash sales and discounts.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f",
    category: "E-commerce",
    date: "Jan 05, 2026",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">📝 Our Blog</h1>
        <p className="mt-2 text-gray-600">Latest news, tips & updates from our store</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map(blog => (
          <motion.div
            key={blog.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                  {blog.category}
                </span>
              </div>

              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                  {blog.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {blog.excerpt}
                </p>

                <Link href={`/blog/${blog.id}`}>
                  <Button variant="link" className="mt-3 px-0 text-orange-600">
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
