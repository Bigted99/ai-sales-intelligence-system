"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  
 const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
  init();
  }, []);

const init = async () => {

const { data: { user } } = await supabase.auth.getUser();
console.log(user);


  if (!user) {
    console.log("No user found");
    return;
  }

  
  await supabase.from("clients").upsert({
    id: user.id,
    email: user.email,
  });

  // 3. Fetch leads AFTER user exists
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  setLeads(data || []);
};


  

  // Create client if not exists
 


  // dashboard metrics
  const totalLeads = leads.length;
  const highIntent = leads.filter((l) => l.intent_level === "high").length;
  const mediumIntent = leads.filter((l) => l.intent_level === "medium").length;
  const lowIntent = leads.filter((l) => l.intent_level === "low").length;

return (
  <div className="p-10 space-y-10">

    <h1 className="text-3xl font-bold">Lead Intelligence Dashboard</h1>

    {/* Top Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Leads</p>
        <h2 className="text-2xl font-semibold">{totalLeads}</h2>
      </div>

      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">High Intent</p>
        <h2 className="text-2xl font-semibold text-green-600">{highIntent}</h2>
      </div>

      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Medium Intent</p>
        <h2 className="text-2xl font-semibold text-yellow-600">{mediumIntent}</h2>
      </div>

      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Low Intent</p>
        <h2 className="text-2xl font-semibold text-red-600">{lowIntent}</h2>
      </div>

    </div>

    {/* Priority Leads */}
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        🔥 Priority Leads
      </h2>

      {leads
        .filter((lead) => lead.intent_level === "high")
        .slice(0, 5)
        .map((lead) => (
          <div key={lead.id} className="border-b py-3 flex justify-between">

            <div>
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-gray-500">
                {lead.human_summary}
              </p>
            </div>

            <span className="text-green-600 font-semibold">
              {lead.qualification_score}
            </span>

          </div>
        ))}

    </div>

    {/* Recent Leads */}
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Latest Leads
      </h2>

      {leads.slice(0, 5).map((lead) => (
        <div key={lead.id} className="border-b py-3">

          <p className="font-semibold">{lead.name}</p>

          <p className="text-sm text-gray-600">
            {lead.human_summary}
          </p>

          <p className="text-sm text-gray-400">
            Intent: {lead.intent_level} | Score: {lead.qualification_score}
          </p>

        </div>
      ))}

    </div>

  </div>
);
}
