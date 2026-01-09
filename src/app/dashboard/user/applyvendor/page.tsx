"use client";

import { useState } from "react";
import axios from "@/lib/axioss";
import { toast } from "sonner";

export default function ApplyVendor() {
  const [form, setForm] = useState({ shopname: "", area: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await axios.post("/api/v1/vendor/apply", form);
    setLoading(false);
    toast.success("Application submitted!");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Apply for Vendor Account</h1>

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Shop Name"
        onChange={(e) => setForm({ ...form, shopname: e.target.value })}
      />

      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="Address"
        onChange={(e) => setForm({ ...form, area: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
