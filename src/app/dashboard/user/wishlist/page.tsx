"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/user/wishlist").then((res) => setItems(res.data.items));
  }, []);

  const remove = async (id: string) => {
    await axios.delete(`/api/v1/user/wishlist/${id}`);
    setItems(items.filter((i: any) => i._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {items.map((item: any) => (
        <div key={item._id} className="flex justify-between p-3 bg-white shadow mb-2 rounded">
          <p>{item.product.name}</p>
          <button className="text-red-500" onClick={() => remove(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
