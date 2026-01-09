"use client";
import { useState, useEffect } from "react";
import axios from "@/lib/axioss";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/v1/user/profile").then((res) => setUser(res.data));
  }, []);

  const updateProfile = async () => {
    await axios.put("/api/v1/user/profile", user);
    toast.success("Profile Updated");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <input
        className="border p-2 w-full mb-3"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-3"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button onClick={updateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </div>
  );
}
