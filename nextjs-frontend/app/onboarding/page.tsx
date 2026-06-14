"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [brandColor, setBrandColor] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in");
      return;
    }
    
  
    const { error } = await supabase
      .from("clients")
    
      .update({
        company_name: companyName,
        website,
        support_email: supportEmail,
        brand_color: brandColor,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }
    
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >
        <h1 className="text-3xl font-bold">Complete Your Setup</h1>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Support Email"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Brand Color (#000000)"
          value={brandColor}
          onChange={(e) => setBrandColor(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Finish Setup
        </button>
      </form>
    </div>
  );
}
