// Site-level config. Override with env vars at deploy time (Vercel).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://muse-hardware-lib.vercel.app";

/** Tally form embed URL for /submit. Empty => placeholder block is shown. */
export const TALLY_FORM_URL = process.env.NEXT_PUBLIC_TALLY_FORM_URL || "";

/** Contact email for /advertise inquiries and /submit fallback. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Jayden@inflowx.ai";

/** Resend audience id for the newsletter ("Muse Hardware Library"). Not secret. */
export const RESEND_AUDIENCE_ID =
  process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID ||
  "ce836590-b3b1-49f7-8705-1a72b95b41ec";

export const AD_TIERS = [
  { id: "feed", price: 29, unit: "week", available: true },
  { id: "banner", price: 49, unit: "week", available: true },
  { id: "newsletter", price: 299, unit: "issue", available: false },
] as const;
