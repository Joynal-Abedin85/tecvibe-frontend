"use client";

import { useState } from "react";
import axios from "@/lib/axioss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/authprovider";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data.data.user);
      console.log(res.data.data);
      setUser(res.data.data.user);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgs px-4 py-10">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Login Form */}
        <div className="bg-texts p-8 rounded-2xl shadow-lg flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-text mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-muteds p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-muteds p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button className="bg-primarys text-texts p-3 rounded-lg mt-2 hover:opacity-90 transition">
              Login
            </button>
          </form>

          {/* Extra Options */}
          <div className="mt-4 flex flex-col gap-3">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(
                    "/api/v1/auth/google",
                    { token: credentialResponse.credential },
                    { withCredentials: true }
                  );

                  toast.success("Google login success");
                  router.push("/");
                } catch (err) {
                  toast.error("Google login failed");
                }
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
            />

            <p className="text-sm text-muteds text-center">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primarys font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center">
          <Image
            src="https://i.postimg.cc/d3WW1nZt/vecteezy-business-data-protection-and-network-security-isometric-48783384.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
