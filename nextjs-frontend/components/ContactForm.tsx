"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setStatus(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        alert("You must be logged in");
        setLoading(false);
        return;
      }

      // 🔥 generate per request (IMPORTANT)

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...formData,
          client_id: session.user.id, // ✅ real user id
          idempotency_key: idempotencyKey, // ✅ per request
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error ?? "Failed request");
      }
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      router.push("/thank-you");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-4 py-12 bg-secondary/10 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center text-heading">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
          />

          <p className="text-xs text-gray-500 mt-2">
            Your message will be securely analyzed by AI to help our team
            prepare before responding.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm text-center">
              Message sent successfully.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              Failed to send message.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
