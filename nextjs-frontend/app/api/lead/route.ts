import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message too long." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Webhook URL not configured" },
        { status: 500 }
      );
    }

   const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "No auth header" }, { status: 401 });
    }

  const token = authHeader.replace("Bearer ", "");


  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 THIS IS THE MAGIC
      },
    },
  }
);

    // 🔥 Get logged-in user
 const {
  data: { user },
} = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔥 Send to n8n
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        client_id: user.id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to forward request to n8n");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}