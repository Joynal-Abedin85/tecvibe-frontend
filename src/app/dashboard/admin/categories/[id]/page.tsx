"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axioss";

export default function CategoryEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/admin/categories/${id}`);
      setItem(res.data?.data ?? res.data);
    } catch (e) {
      console.error(e);
      alert("Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchItem(); }, [id]);

  const handleUpdate = async () => {
    if (!item?.name?.trim()) { alert("Name required"); return; }
    try {
      setSaving(true);
      await axios.put(`/api/v1/admin/categories/${id}`, { name: item.name, slug: item.slug, description: item.description });
      alert("Updated");
      router.push("/dashboard/admin/categories");
    } catch (e) {
      console.error(e);
      alert("Update failed");
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete category?")) return;
    try {
      await axios.delete(`/api/v1/admin/categories/${id}`);
      router.push("/dashboard/admin/categories");
    } catch (e) {
      console.error(e); alert("Delete failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6 text-red-600">Not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">Edit Category</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={item.name} onChange={(e)=>setItem({...item, name:e.target.value})} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm mb-1">Slug</label>
          <input value={item.slug} onChange={(e)=>setItem({...item, slug:e.target.value})} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={item.description} onChange={(e)=>setItem({...item, description:e.target.value})} className="w-full p-2 border rounded h-28"></textarea>
        </div>

        <div className="flex gap-2">
          <button onClick={handleUpdate} disabled={saving} className="px-4 py-2 bg-[var(--color-accents)] text-[var(--color-texts)] rounded">
            {saving ? "Saving..." : "Save"}
          </button>

          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
