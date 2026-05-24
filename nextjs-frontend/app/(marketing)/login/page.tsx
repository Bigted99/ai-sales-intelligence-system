"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });

    setLoading(false);

    if (error) alert(error.message);
    else alert("Check your email for login link 🚀");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 border rounded-xl w-96 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </div>
    </div>
  );
}