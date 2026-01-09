"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axioss";
import { toast } from "sonner";

export default function BrandCreatePage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Name required"); return; }

    try {
      setLoading(true);
      if (logoFile) {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("description", desc);
        fd.append("logo", logoFile);
        await axios.post("/api/v1/admin/brands", fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axios.post("/api/v1/admin/brands", { name, description: desc });
      }
      router.push("/dashboard/admin/brands");
    } catch (err) {
      console.error(err); toast.error("Create failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">Create Brand</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full p-2 border rounded h-28" />
        </div>

        <div>
          <label className="block text-sm mb-1">Logo (optional)</label>
          <input type="file" onChange={(e)=>setLogoFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-[var(--color-accents)] text-[var(--color-texts)] rounded">
            {loading ? "Creating..." : "Create"}
          </button>
          <button type="button" onClick={()=>router.back()} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
