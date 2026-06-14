import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { leadId, status } = await request.json();

    if (!leadId || !status) {
      return NextResponse.json(
        { error: "Missing leadId or status" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );

    // Update lead
    const { error: updateError } = await supabase
      .from("leads")
      .update({
        status,
        lifecycle_stage: status,
      })
      .eq("id", leadId);

    if (updateError) {
      throw updateError;
    }

    // Activity log
    await supabase.from("lead_activities").insert({
      lead_id: leadId,
      type: "status_change",
      message: `Lead status changed to ${status.toUpperCase()}`,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}