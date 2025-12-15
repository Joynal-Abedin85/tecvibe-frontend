"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    categoryid: "",
    brandid: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/v1/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/api/v1/admin/brands");
      setBrands(res.data);
    } catch (err) {
      console.error(err);
    }
  };

const handleSubmit = async () => {
  if (!form.name || !form.price || !form.stock || !form.categoryid || !form.brandid) {
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);

  try {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("price", String(Number(form.price))); // ensure number
    fd.append("stock", String(Number(form.stock)));
    fd.append("description", form.description);
    fd.append("categoryid", form.categoryid);
    fd.append("brandid", form.brandid);

    images.forEach((img) => fd.append("images", img));

    // 🔹 Debug: Show all FormData keys and values
    for (let pair of fd.entries()) {
      console.log("FormData:", pair[0], pair[1]);
    }

    const res = await axios.post("/api/v1/vendor/products", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Response:", res.data);
    alert("Product Created Successfully!");
    setForm({ name: "", price: "", stock: "", description: "", categoryid: "", brandid: "" });
    setImages([]);
  } catch (err: any) {
    // 🔹 Debug: show full error object
    if (err.response) {
      console.error("Error Response:", err.response.data);
      alert("Failed to create product: " + JSON.stringify(err.response.data));
    } else if (err.request) {
      console.error("Error Request:", err.request);
      alert("Failed to create product: No response from server");
    } else {
      console.error("Error Message:", err.message);
      alert("Failed to create product: " + err.message);
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-xl mx-auto p-6 bg-[var(--color-bgs)] text-[var(--color-texts)] rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      {/* NAME */}
      <input
        className="w-full border p-2 mb-2 rounded bg-white text-black"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* PRICE */}
      <input
        className="w-full border p-2 mb-2 rounded bg-white text-black"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {/* STOCK */}
      <input
        className="w-full border p-2 mb-2 rounded bg-white text-black"
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      {/* CATEGORY */}
      <select
        className="w-full border p-2 mb-2 rounded bg-white text-black"
        value={form.categoryid}
        onChange={(e) => setForm({ ...form, categoryid: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* BRAND */}
      <select
        className="w-full border p-2 mb-2 rounded bg-white text-black"
        value={form.brandid}
        onChange={(e) => setForm({ ...form, brandid: e.target.value })}
      >
        <option value="">Select Brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      {/* DESCRIPTION */}
      <textarea
        className="w-full border p-2 mb-3 rounded bg-white text-black"
        placeholder="Description"
        value={form.description}
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
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-500" : "bg-[var(--color-accents)]"
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </div>
  );
}
