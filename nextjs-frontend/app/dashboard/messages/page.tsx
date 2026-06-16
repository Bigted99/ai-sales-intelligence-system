"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ConversationCard from "@/components/dashboard/ConversationCard";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
          *,
          leads (
            id,
            name,
            email
          )
        `,
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    const latestPerLead = new Map();

    (data || []).forEach((conversation) => {
      if (!latestPerLead.has(conversation.lead_id)) {
        latestPerLead.set(conversation.lead_id, conversation);
      }
    });

    setConversations(Array.from(latestPerLead.values()));
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("conversations-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          fetchConversations();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="px-4 py-6 md:p-10">Loading conversations...</div>;
  }

  return (
    <div className="px-4 py-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="space-y-4">
        {conversations.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
            No conversations yet.
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
            />
          ))
        )}
      </div>
    </div>
  );
}
