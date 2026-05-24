"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LeadActionsMenu from "@/components/dashboard/LeadActionsMenu";
import MetricCard from "@/components/dashboard/MetricCard";
import LeadTimeline from "@/components/dashboard/LeadTimeline";

import {
  formatNextAction,
  formatSummary,
  formatOpeningMessage,
} from "@/lib/formatters";
import NextActionCard from "@/components/dashboard/NextActionCard";
import AIOutreachCard from "@/components/dashboard/AIOutreachCard";

type Props = {
  params: {
    id: string;
  };
};

export default function LeadDetailsPage() {
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id as string;
  useEffect(() => {
    fetchLead();
  }, []);
  const [activities, setActivities] = useState<any[]>([]);
  const fetchLead = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();


    const { data: activityData } = await supabase
      .from("lead_activities")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false });

    setActivities(activityData || []);

    if (error) {
      console.log("PARAM ID:", id);
      console.log("SUPABASE DATA:", data);
      console.log("SUPABASE ERROR:", error);
      setLoading(false);

      return;
    }

    setLead(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="px-4 py-6 md:p-10">Loading lead details...</div>;
  }

  if (!lead) {
    return <div className="px-4 py-6 md:p-10">Lead not found.</div>;
  }

  return (
    <div className="px-4 py-6 md:p-10 space-y-8 max-w-5xl  ">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{lead.name}</h2>

          <p className="text-muted-foreground mt-1">{lead.email}</p>

          <p className="text-sm text-muted-foreground mt-3">Updated just now</p>
          <div className="mt-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {lead.status?.charAt(0).toUpperCase() + lead.status?.slice(1)}
            </span>
          </div>
        </div>

        <LeadActionsMenu />
      </div>
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow mt-43">
        <h2 className="text-xl font-semibold mb-4">AI Summary</h2>

        <p className="leading-relaxed">{formatSummary(lead.human_summary)}</p>
      </div>
      <NextActionCard
        nextAction={formatNextAction(lead.next_action)}
        confidence={lead.confidence_level}
        urgency={lead.urgency_level}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <MetricCard
          title="Intent Level"
          value={lead.intent_level}
          intent={lead.intent_level}
        />

        <MetricCard title="AI Score" value={lead.qualification_score} />

        <MetricCard
          title="Created"
          value={new Date(lead.created_at).toLocaleDateString()}
        />
      </div>

      <AIOutreachCard
        openingMessage={formatOpeningMessage(lead.opening_message)}
        channel={lead.email ? "Email" : lead.phone ? "Phone" : "Unknown"}
        status="Delivered 2 mins ago"
      />

    <LeadTimeline activities={activities} />
    </div>
  );
}
