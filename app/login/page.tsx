"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/sheet");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white font-mono">
      <div className="bg-zinc-800 p-8 rounded border border-zinc-700 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-widest uppercase border-b border-zinc-700 pb-4">
          Orbis Arcana
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm uppercase text-zinc-500 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded focus:border-red-800 focus:outline-none transition-colors"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm uppercase text-zinc-500 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded focus:border-red-800 focus:outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-4 rounded transition-colors uppercase tracking-widest"
          >
            Access Terminal
          </button>
        </form>
      </div>
    </div>
  );
}
