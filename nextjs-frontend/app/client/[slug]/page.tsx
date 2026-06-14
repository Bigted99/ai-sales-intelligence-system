"use client";
import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "@/lib/supabase";


type Client = {
  id: string;
  company_name: string;
  brand_color: string;
  support_email: string;
  website: string;
  slug: string;
};

export default function ClientPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = React.use(params);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("slug", resolvedParams.slug)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setClient(data);
    setLoading(false);
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!client) return;

  setSubmitting(true);

  try {
    const idempotencyKey = crypto.randomUUID();

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: client.id,
        name,
        email,
        message,
        source: "client_form",
        idempotency_key: idempotencyKey,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit lead");
    }

    alert("Lead submitted successfully 🚀");

    setName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    console.error(error);
    alert("Failed to submit lead");
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="h-screen flex items-center justify-center">
        Client not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 border-b bg-white flex justify-between">
        <h1 className="text-2xl font-bold">{client.company_name}</h1>

        <a href={`mailto:${client.support_email}`} className="text-sm">
          {client.support_email}
        </a>
      </div>

      <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded-xl shadow">
        <h2
          className="text-4xl font-bold mb-4"
          style={{ color: client.brand_color }}
        >
          Welcome to {client.company_name}
        </h2>

        <p className="text-gray-600 mb-8">Submit your request below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded h-40"
          />

          <button
            type="submit"
            className="w-full text-white p-3 rounded"
            style={{
              backgroundColor: client.brand_color,
            }}
          >
           {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
