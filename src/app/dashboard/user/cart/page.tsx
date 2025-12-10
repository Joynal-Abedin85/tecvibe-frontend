"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/user/cart").then((res) => setCart(res.data.items));
  }, []);

  const updateQty = async (id: string, qty: number) => {
    await axios.put(`/api/v1/user/cart/${id}`, { quantity: qty });
    const res = await axios.get("/api/v1/user/cart");
    setCart(res.data.items);
  };

  const removeItem = async (id: string) => {
    await axios.delete(`/api/v1/user/cart/${id}`);
    setCart(cart.filter((i: any) => i._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {cart.map((item: any) => (
        <div key={item._id} className="flex justify-between p-4 shadow mb-3 rounded">
          <p>{item.product.name}</p>
          <div className="flex gap-2">
            <button onClick={() => updateQty(item._id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
          </div>
          <button className="text-red-500" onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
