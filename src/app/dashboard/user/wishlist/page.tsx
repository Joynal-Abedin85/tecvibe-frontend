"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/axioss";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/v1/user/wishlist")
      .then((res) => setItems(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  // 🔢 total wishlist amount
  const totalAmount = useMemo(() => {
    return items.reduce((sum, i) => sum + i.product.price, 0);
  }, [items]);

  // ❌ remove wishlist item
  const remove = async (id: string) => {
    setProcessing(id);
    await axios.delete(`/api/v1/user/wishlist/${id}`);
    setItems(items.filter((i) => i.id !== id));
    setProcessing(null);
  };

  // 🛒 add to cart
  const addToCart = async (productid: string) => {
    setProcessing(productid);
    await axios.post("/api/v1/user/cart", {
      productid,
      quantity: 1,
    });
    alert("Added to cart");
    setProcessing(null);
  };

  if (loading) {
    return <p className="text-center py-20">Loading wishlist...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center py-20">Your wishlist is empty 💔</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      {/* wishlist items */}
      <div className="space-y-4">
        {items.map((item) => {
          const product = item.product;

          return (
            <div
              key={item.id}
              className="flex gap-4 items-center bg-white shadow rounded-lg p-4"
            >
              {/* image */}
              <img
                src={product.productimages?.[0]?.url || "/placeholder.jpg"}
                className="w-24 h-24 object-cover rounded"
                alt={product.name}
              />

              {/* info */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  {product.verdor?.shopname}
                </p>
                <p className="font-bold mt-1">${product.price}</p>
              </div>

              {/* actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => addToCart(product.id)}
                  disabled={processing === product.id}
                  className="bg-blue-600 text-white"
                >
                  {processing === product.id ? "Adding..." : "Add to Cart"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => remove(item.id)}
                  disabled={processing === item.id}
                >
                  {processing === item.id ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* total */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total</h2>
        <span className="text-xl font-bold">${totalAmount}</span>
      </div>
    </div>
  );
}

