import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { Shelf, SourceType } from "@/content/schema";

// Phase 1: validate + persist to data/submissions.jsonl (gitignored).
// An editor reviews each row against the Receipts principle, writes it up
// bilingually, and it goes live with the next deploy.
// Follow-up (not now): auto-file a GitHub issue per submission as a review
// queue — needs a server-side token, which Vercel doesn't have.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE_TYPES: SourceType[] = ["github", "video", "article", "social"];
const SHELVES: Shelf[] = [
  "smart-home",
  "robots",
  "wearable",
  "dev-boards",
  "sensors",
  "displays",
];

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const sourceUrl = str(body.sourceUrl);
  const oneLiner = str(body.oneLiner);
  const sourceType = str(body.sourceType);
  const shelf = str(body.shelf);
  const contactEmail = str(body.contactEmail);
  const lang = body.lang === "zh" ? "zh" : "en";

  if (!name || !sourceUrl || !oneLiner) {
    return NextResponse.json({ ok: false, error: "err_required" }, { status: 400 });
  }
  if (name.length > 120) {
    return NextResponse.json({ ok: false, error: "err_required" }, { status: 400 });
  }
  if (!isHttpUrl(sourceUrl) || sourceUrl.length > 2048) {
    return NextResponse.json({ ok: false, error: "err_bad_url" }, { status: 400 });
  }
  if (oneLiner.length > 200) {
    return NextResponse.json({ ok: false, error: "err_too_long" }, { status: 400 });
  }
  if (!SOURCE_TYPES.includes(sourceType as SourceType)) {
    return NextResponse.json({ ok: false, error: "err_bad_type" }, { status: 400 });
  }
  if (!SHELVES.includes(shelf as Shelf)) {
    return NextResponse.json({ ok: false, error: "err_bad_shelf" }, { status: 400 });
  }
  if (contactEmail && (!EMAIL_RE.test(contactEmail) || contactEmail.length > 254)) {
    return NextResponse.json({ ok: false, error: "err_bad_email" }, { status: 400 });
  }

  const record = {
    name,
    sourceUrl,
    oneLiner,
    sourceType,
    shelf,
    contactEmail: contactEmail || null,
    lang,
    receivedAt: new Date().toISOString(),
  };

  try {
    const dir = join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      join(dir, "submissions.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8"
    );
  } catch {
    return NextResponse.json({ ok: false, error: "err_server" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
