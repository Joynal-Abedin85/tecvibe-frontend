"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axioss";

const fields = ["name", "email", "phone"] as const;
type FieldType = typeof fields[number];

export default function CreateManagerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/v1/admin/managers", form);
      router.push("/dashboard/admin/managers");
    } catch (e) {
      alert("Failed to create manager");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">
        Create Manager
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow space-y-4"
      >
        {fields.map((field: FieldType) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              className="border w-full p-2 rounded"
              value={form[field]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }))
              }
              required
            />
          </div>
        ))}

        <button
          className="px-4 py-2 bg-[var(--color-accents)] text-white rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}

