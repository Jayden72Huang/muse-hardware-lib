import { NextRequest, NextResponse} from "next/server";
import { resendConfigured, resendPost} from "@/lib/resend";
import { CONTACT_EMAIL} from "@/content/config";
import type { Shelf, SourceType} from "@/content/schema";

// Native submission intake. Validates, then emails the submission to the
// editor via Resend (inbox = the review queue). No database needed for v1:
// the editor writes approved builds up bilingually and they go live on deploy.

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
return NextResponse.json({ ok: false, error: "submitFail"}, { status: 400});
}

const str = (v: unknown) => (typeof v === "string"? v.trim(): "");
const name = str(body.name);
const sourceUrl = str(body.sourceUrl);
const oneLiner = str(body.oneLiner);
const sourceType = str(body.sourceType);
const shelf = str(body.shelf);
const contactEmail = str(body.contactEmail);
const lang = body.lang === "zh"? "zh": "en";

if (!name ||!sourceUrl ||!oneLiner) {
return NextResponse.json({ ok: false, error: "errRequired"}, { status: 400});
}
if (name.length > 120) {
return NextResponse.json({ ok: false, error: "errRequired"}, { status: 400});
}
if (!isHttpUrl(sourceUrl) || sourceUrl.length > 2048) {
return NextResponse.json({ ok: false, error: "errBadUrl"}, { status: 400});
}
if (oneLiner.length > 200) {
return NextResponse.json({ ok: false, error: "errTooLong"}, { status: 400});
}
if (!SOURCE_TYPES.includes(sourceType as SourceType)) {
return NextResponse.json({ ok: false, error: "errBadType"}, { status: 400});
}
if (!SHELVES.includes(shelf as Shelf)) {
return NextResponse.json({ ok: false, error: "errBadShelf"}, { status: 400});
}
if (contactEmail && (!EMAIL_RE.test(contactEmail) || contactEmail.length > 254)) {
return NextResponse.json({ ok: false, error: "errBadEmail"}, { status: 400});
}
if (!resendConfigured()) {
return NextResponse.json({ ok: false, error: "errConfig"}, { status: 503});
}

const text = [
`New build submission (${lang})`,
``,
`Name: ${name}`,
`Source: ${sourceUrl}`,
`Type: ${sourceType} | Shelf: ${shelf}`,
`Contact: ${contactEmail || "(none)"}`,
``,
`One-liner: ${oneLiner}`,
``,
`Received: ${new Date().toISOString()}`,
].join("\n");

const r = await resendPost("/emails", {
from: "Muse Hardware Library <builds@inflowx.ai>",
to: [CONTACT_EMAIL],
...(contactEmail? { reply_to: contactEmail}: {}),
subject: `${name}`,
text,
});
if (!r.ok) {
return NextResponse.json({ ok: false, error: "submitFail"}, { status: 502});
}
return NextResponse.json({ ok: true});
}
