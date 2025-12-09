"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../actions/getme";
import axios from "@/lib/axioss";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setUser(data);
    };
    fetchUser();
  }, []);

//   logout 

 const logout = async () => {
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      setUser(null); // remove user from state
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return <AuthContext.Provider value={{ user, setUser,logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
