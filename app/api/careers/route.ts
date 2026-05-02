import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwWo9reeqYcnq81dDJSC31hadeZwZ03a-ebP8K2Jf67aQA7a_v3bFzx1vbuKgNp4e50/exec";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, role, roleLabel, message, fileName, fileType, fileBase64 } = body;

  if (!name || !email || !phone || !role || !roleLabel || !fileName || !fileBase64) {
    return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
  }

  // Server-side file size guard (~4 MB decoded)
  const estimatedBytes = Math.ceil((fileBase64.length * 3) / 4);
  if (estimatedBytes > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large." }, { status: 413 });
  }

  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "careers",
      name,
      email,
      phone,
      role,
      roleLabel,
      message: message ?? "",
      fileName,
      fileType: fileType ?? "application/octet-stream",
      fileBase64,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to process application." }, { status: 500 });
  }

  const scriptResult = await res.json().catch(() => ({ success: false }));
  if (!scriptResult.success) {
    console.error("Apps Script error:", scriptResult.error);
    return NextResponse.json({ error: "Failed to process application." }, { status: 500 });
  }

  const { error: dbError } = await supabase
    .from("career_applications")
    .insert({ name, email, phone, role, role_label: roleLabel, message: message ?? null, file_name: fileName });

  if (dbError) {
    console.error("Supabase insert failed:", dbError.message);
  }

  return NextResponse.json({ success: true });
}
