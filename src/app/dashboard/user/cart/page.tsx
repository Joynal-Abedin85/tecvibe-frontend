"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/axioss";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/v1/user/cart").then((res) => {
      setCart(res.data.data);
      setLoading(false);
    });
  }, []);

  // 🔢 total price
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.Product.price * item.quantity,
      0
    );
  }, [cart]);

  console.log(cart)

  // ➕➖ update quantity
  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;

    setUpdating(id);
    await axios.put(`/api/v1/user/cart/${id}`, { quantity: qty });

    const res = await axios.get("/api/v1/user/cart");
    setCart(res.data.data);
    setUpdating(null);
  };

  // ❌ remove item
  const removeItem = async (id: string) => {
    setUpdating(id);
    await axios.delete(`/api/v1/user/cart/${id}`);
    setCart(cart.filter((i) => i.id !== id));
    setUpdating(null);
  };

  if (loading) {
    return <p className="text-center py-20">Loading cart...</p>;
  }

  if (cart.length === 0) {
    return <p className="text-center py-20">Your cart is empty 🛒</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {/* cart items */}
      <div className="space-y-4">
        {cart.map((item) => {
          const product = item.Product;
          const subtotal = product.price * item.quantity;

          return (
            <div
              key={item.id}
              className="flex gap-4 items-center bg-white shadow rounded-lg p-4"
            >
              {/* image */}
              <img
                src={product.productimage?.[0]?.url || "/placeholder.jpg"}
                className="w-24 h-24 object-cover rounded"
                alt={product.name}
              />

              {/* info */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Price: ${product.price}
                </p>
                <p className="font-medium mt-1">
                  Subtotal: ${subtotal}
                </p>
              </div>

              {/* quantity */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  disabled={updating === item.id}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  disabled={updating === item.id}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>

              {/* remove */}
              <Button
                variant="destructive"
                onClick={() => removeItem(item.id)}
                disabled={updating === item.id}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>

      {/* summary */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">Total</h2>
        <span className="text-2xl font-bold">${totalPrice}</span>
      </div>

      {/* order button */}
      <div className="mt-6 flex justify-end">
        <Button
          className="bg-green-600 text-white px-6 py-3 text-lg"
          onClick={() => router.push("/dashboard/user/checkout")}
        >
          Proceed to Order
        </Button>
      </div>
    </div>
  );
}

