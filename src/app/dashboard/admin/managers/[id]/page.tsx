"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type ManagerType = {
  id: string;
  userid: string;
  area?: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function EditManagerPage() {
  const { id } = useParams();
  const router = useRouter();

  //   const [manager, setManager] = useState(null);
  const [manager, setManager] = useState<ManagerType | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/managers/${id}`);
      setManager(res.data?.data);
    } catch {
      toast.error("Failed to load manager");
    } finally {
      setLoading(false);
    }
  };

  const fields = ["name", "email", "phone"] as const;
  type FieldType = (typeof fields)[number];

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateManager = async () => {
    try {
      setSaving(true);
      await axios.put(`/api/v1/admin/managers/${id}`, manager);
      router.push("/dashboard/admin/managers");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteManager = async () => {
    if (!confirm("Delete this manager?")) return;

    await axios.delete(`/api/v1/admin/managers/${id}`);
    router.push("/dashboard/admin/managers");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!manager)
    return <div className="p-6 text-red-600">Manager not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)] mb-4">
        Edit Manager
      </h1>

      <div className="bg-white p-5 rounded shadow space-y-4">
        {fields.map((field: FieldType) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>

            <input
              className="border w-full p-2 rounded"
              value={manager?.user?.[field] ?? ""}
              onChange={(e) =>
                setManager((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: {
                          ...prev.user,
                          [field]: e.target.value,
                        },
                      }
                    : prev
                )
              }
            />
          </div>
        ))}

        <div className="flex gap-3">
          <button
            onClick={updateManager}
            className="px-4 py-2 bg-[var(--color-accents)] text-white rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={deleteManager}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
