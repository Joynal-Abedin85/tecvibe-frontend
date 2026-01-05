// app/actions/getMe.ts

import axios from "@/lib/axioss";


export async function getMe() {
  try {
    const res = await axios.get("/api/v1/auth/get", {
      withCredentials: true,
    });

    return res.data.data; // user object
  } catch (err: any) {
    console.log("❌ getMe error:", err.response?.data || err.message);
    return null;
  }
}
