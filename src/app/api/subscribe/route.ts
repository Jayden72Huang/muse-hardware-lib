import { NextRequest, NextResponse } from "next/server";
import { resendConfigured, resendPost } from "@/lib/resend";
import { RESEND_AUDIENCE_ID } from "@/content/config";

// Newsletter subscribe → Resend audience "Muse Hardware Library".
// Duplicate emails are treated as success (idempotent subscribe).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const email =
    typeof (body as { email?: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!resendConfigured()) {
    return NextResponse.json({ ok: false, error: "err_config" }, { status: 503 });
  }

  const r = await resendPost(`/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    email,
    unsubscribed: false,
  });
  // 409 = already in audience → still a success from the user's view
  if (r.ok || r.status === 409) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "err_server" }, { status: 502 });
}
