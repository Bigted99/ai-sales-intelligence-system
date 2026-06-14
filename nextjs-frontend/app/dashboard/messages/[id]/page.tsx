"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getSenderStyles } from "@/lib/uiMappings";

export default function ConversationPage() {
  const params = useParams();

  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversation = async () => {
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
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setConversation(data);

      const { data: history } = await supabase
        .from("conversations")
        .select("*")
        .eq("lead_id", data.lead_id)
        .order("created_at", {
          ascending: true,
        });

      setMessages(history || []);

      setLoading(false);
    };

    fetchConversation();
  }, [params.id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!conversation) {
    return <div className="p-10">Conversation not found.</div>;
  }

  return (
    <div className="p-10 space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold">{conversation.leads?.name}</h1>

        <p className="text-muted-foreground">{conversation.leads?.email}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm text-muted-foreground mb-2">Latest Message</p>

        <p>{conversation.message}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-6">Conversation History</h2>

        <div className="space-y-4">
          {messages.map((message) => {
            const senderUi = getSenderStyles(message.sender_type);

            return (
              <div
                key={message.id}
                className={`
          ${senderUi.bg}
         
          border
          p-4
          rounded-xl
        `}
              >
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  {senderUi.label}
                </div>

                <p className="text-sm leading-relaxed">{message.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
