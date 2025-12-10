"use client";

import { useState } from "react";
import axios from "@/lib/axioss";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleSubmit = async () => {
    await axios.post("/api/v1/vendors/products", form);
    alert("Product Created!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Price"
        type="number"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Stock"
        type="number"
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <textarea
        className="w-full border p-2 mb-3 rounded"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
