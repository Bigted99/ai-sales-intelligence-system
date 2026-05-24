import { supabase } from "@/lib/supabase";

export async function logActivity({
  leadId,
  type,
  message,
}: {
  leadId: string;
  type: string;
  message: string;
}) {
  const { error } = await supabase
    .from("lead_activities")
    .insert({
      lead_id: leadId,
      type,
      message,
    });

  if (error) {
    console.error("Activity log failed:", error);
  }
}