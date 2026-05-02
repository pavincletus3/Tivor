import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwWo9reeqYcnq81dDJSC31hadeZwZ03a-ebP8K2Jf67aQA7a_v3bFzx1vbuKgNp4e50/exec";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const params = new URLSearchParams({ name, email, message });

  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message });

  if (dbError) {
    console.error("Supabase insert failed:", dbError.message);
  }

  return NextResponse.json({ success: true });
}
