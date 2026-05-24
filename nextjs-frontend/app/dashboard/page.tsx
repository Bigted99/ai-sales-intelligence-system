"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LeadMetricsChart from "@/components/dashboard/LeadMetricsChart";
import AIInsights from "@/components/dashboard/AIInsights";
import LeadRowComponent from "@/components/dashboard/LeadRowComponent";
import MetricCard from "@/components/dashboard/MetricCard";


export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });

    setLeads(data || []);
    setLoading(false);
  };

  // Create client if not exists

  // dashboard metrics
  const totalLeads = leads.length;
  const highIntent = leads.filter((l) => l.intent_level === "high").length;
  const mediumIntent = leads.filter((l) => l.intent_level === "medium").length;
  const lowIntent = leads.filter((l) => l.intent_level === "low").length;

  if (loading) {
    return (
      <div className="px-4 py-6 md:p-10">
        <p className="text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.human_summary?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || lead.intent_level === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-4 py-6 md:p-10 space-y-10">
      <h1 className="text-3xl font-bold">Lead Intelligence Dashboard</h1>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Leads" value={totalLeads} />

        <MetricCard title="High Intent" value={highIntent} intent="high" />

        <MetricCard
          title="Medium Intent"
          value={mediumIntent}
          intent="medium"
        />

        <MetricCard title="Low Intent" value={lowIntent} intent="low" />
      </div>
      <LeadMetricsChart />
      <AIInsights />

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3 bg-white/70 backdrop-blur-md"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 bg-white/70 backdrop-blur-md"
        >
          <option value="all">All Leads</option>
          <option value="high">High Intent</option>
          <option value="medium">Medium Intent</option>
          <option value="low">Low Intent</option>
        </select>
      </div>

      {/* Priority Leads */}
      <div
        className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow hover:bg-muted/5
hover:shadow-sm
cursor-pointer
transition-all
duration-200  px-5"
      >
        <h2 className="text-xl font-semibold mb-4">🔥 Priority Leads</h2>

        {filteredLeads
          .filter((lead) => lead.intent_level === "high")
          .slice(0, 5)
          .map((lead) => (
            <LeadRowComponent
             key={lead.id}
              id={lead.id}
              name={lead.name}
              message={lead.human_summary}
              intent={lead.intent_level}
              score={lead.qualification_score}
            />
          ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow hover:bg-muted/5 hover:shadow-sm cursor-pointer transition-all duration-200">
        <h2 className="text-xl font-semibold mb-4">Latest Leads</h2>

        {leads.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold">No leads yet</h3>

            <p className="text-muted-foreground mt-2">
              Incoming AI-qualified leads will appear here.
            </p>
          </div>
        ) : (
          filteredLeads
            .slice(0, 5)
            .map((lead) => (
              <LeadRowComponent
               key={lead.id}
                id={lead.id}
                name={lead.name}
                message={lead.human_summary}
                intent={lead.intent_level}
                score={lead.qualification_score}
              />
            ))
        )}
      </div>
    </div>
  );
}
