"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    categoryid: "",
    brandid: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch categories & brands on load
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("/api/v1/category");
    setCategories(res.data.data);
  };

  const fetchBrands = async () => {
    const res = await axios.get("/api/v1/brand");
    setBrands(res.data.data);
  };

  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("stock", form.stock);
    fd.append("description", form.description);
    fd.append("categoryid", form.categoryid);
    fd.append("brandid", form.brandid);

    images.forEach((img) => fd.append("images", img));

    await axios.post("/api/v1/vendor/products", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product Created Successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      {/* NAME */}
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Product Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* PRICE */}
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Price"
        type="number"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {/* STOCK */}
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Stock"
        type="number"
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      {/* CATEGORY */}
      <select
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setForm({ ...form, categoryid: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((cat: any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* BRAND */}
      <select
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setForm({ ...form, brandid: e.target.value })}
      >
        <option value="">Select Brand</option>
        {brands.map((brand: any) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      {/* DESCRIPTION */}
      <textarea
        className="w-full border p-2 mb-3 rounded"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* IMAGES */}
      <input
        type="file"
        multiple
        className="mb-3"
        onChange={(e: any) => setImages(Array.from(e.target.files))}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Create Product
      </button>
    </div>
  );
}
