import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

// Phase 1: validate + persist to data/subscribers.jsonl (gitignored).
// Phase 2: switch to Resend Audiences/Contacts API (API key already available).
//   POST https://api.resend.com/audiences/{audience_id}/contacts
//   { "email": ..., "unsubscribed": false }

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
  const lang =
    (body as { lang?: unknown }).lang === "zh" ? "zh" : "en";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    const dir = join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      join(dir, "subscribers.jsonl"),
      JSON.stringify({ email, lang, ts: new Date().toISOString() }) + "\n",
      "utf8"
    );
  } catch {
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
