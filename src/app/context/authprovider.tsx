"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../actions/getme";
import axios from "@/lib/axioss";
import { useRouter } from "next/router";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
  loading: any
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);

  //   logout

  const logout = async () => {
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      setUser(null); 
      router.push("/login");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout , loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
