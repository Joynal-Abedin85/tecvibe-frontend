"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axioss";

export default function BrandEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState<any>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchBrand = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/brands/${id}`);
      setItem(res.data?.data ?? res.data);
    } catch (e) {
      console.error(e);
      alert("Load failed");
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchBrand(); }, [id]);

  const handleUpdate = async () => {
    if (!item?.name?.trim()) { alert("Name required"); return; }

    try {
      setSaving(true);
      if (logoFile) {
        const fd = new FormData();
        fd.append("name", item.name);
        fd.append("description", item.description ?? "");
        fd.append("logo", logoFile);
        await axios.put(`/api/admin/brands/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axios.put(`/api/admin/brands/${id}`, { name: item.name, description: item.description });
      }
      alert("Updated");
      router.push("/dashboard/admin/brands");
    } catch (e) {
      console.error(e);
      alert("Update failed");
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete brand?")) return;
    try {
      await axios.delete(`/api/admin/brands/${id}`);
      router.push("/dashboard/admin/brands");
    } catch (e) {
      console.error(e); alert("Delete failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6 text-red-600">Not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">Edit Brand</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={item.name} onChange={(e)=>setItem({...item, name:e.target.value})} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={item.description} onChange={(e)=>setItem({...item, description:e.target.value})} className="w-full p-2 border rounded h-28"></textarea>
        </div>

        <div>
          <label className="block text-sm mb-1">Logo (replace)</label>
          <input type="file" onChange={(e)=>setLogoFile(e.target.files?.[0] ?? null)} />
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
