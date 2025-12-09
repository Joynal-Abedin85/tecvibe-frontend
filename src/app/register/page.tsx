"use client";

import { useState } from "react";
import axios from "@/lib/axioss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      },
      {
        withCredentials: true,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-texts px-4 py-10">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Side: Register Form */}
        <div className="bg-bgs p-8 rounded-2xl shadow-lg mt-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-text mb-6">Create Account</h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-muteds p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primarys"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-muteds p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primarys"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-muteds p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primarys"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-muteds p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button className="bg-primarys text-texts p-3 rounded-lg mt-2 hover:opacity-90 transition">
              Register
            </button>
          </form>

          {/* Extra Options */}
          <div className="mt-4 flex flex-col gap-3">
            <button className="flex items-center justify-center border border-muteds p-2 rounded-lg hover:bg-muteds transition">
              <Image
                src="/google-logo.png" // replace with local Google logo
                alt="Google"
                width={20}
                height={20}
              />
              <span className="ml-2 text-texts">Register with Google</span>
            </button>

            <p className="text-sm text-muteds text-center">
              Already have an account?{" "}
              <a href="/login" className="text-primarys font-semibold hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="hidden md:flex justify-center items-center">
          <Image
            src="https://i.postimg.cc/HLB8FNfB/vecteezy-mobile-security-concept-secure-internet-connection-27389247.png" 
            alt="Register Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
