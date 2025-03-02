"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContex";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Registering user", { name, email, password });
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[rgb(17,24,39)] px-4 pt-20 pb-10 ">
      <div className="w-full max-w-md p-6 bg-gray-800 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-[rgb(255,215,0)] text-center mb-6">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-black/30 backdrop-blur-md border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[rgb(255,215,0)] focus:outline-none placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/30 backdrop-blur-md border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[rgb(255,215,0)] focus:outline-none placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/30 backdrop-blur-md border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[rgb(255,215,0)] focus:outline-none placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-black/30 backdrop-blur-md border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[rgb(255,215,0)] focus:outline-none placeholder-gray-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[rgb(30,58,138)] to-[rgb(17,24,39)] text-white font-semibold shadow-lg hover:from-[rgb(17,24,39)] hover:to-[rgb(30,58,138)]
           focus:ring-[rgb(255,215,0)] focus:outline-none transition-all duration-300"

          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[rgb(0,68,255)] hover:underline  hover:text-[rgb(255,215,0)] ">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
