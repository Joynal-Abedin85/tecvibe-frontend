"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axioss";

export default function CategoryCreatePage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name.trim()) { alert("Name is required"); return; }
    try {
      setLoading(true);
      await axios.post("/api/v1/admin/categories", { name, slug, description });
      router.push("/api/v1/dashboard/admin/categories");
    } catch (err) {
      console.error(err);
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">Create Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded" required/>
        </div>

        <div>
          <label className="block text-sm mb-1">Slug (optional)</label>
          <input value={slug} onChange={(e)=>setSlug(e.target.value)} className="w-full p-2 border rounded"/>
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full p-2 border rounded h-28" />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-[var(--color-accents)] text-[var(--color-texts)] rounded" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>

          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
