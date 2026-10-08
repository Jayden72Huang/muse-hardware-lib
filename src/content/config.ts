// Site-level config. Override with env vars at deploy time (Vercel).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://muse-hardware-lib.vercel.app";

/** Tally form embed URL for /submit. Empty => placeholder block is shown. */
export const TALLY_FORM_URL = process.env.NEXT_PUBLIC_TALLY_FORM_URL || "";

/** Contact email for /advertise inquiries and /submit fallback. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Jayden@inflowx.ai";

export const AD_TIERS = [
  { id: "feed", price: 99, unit: "week" },
  { id: "banner", price: 149, unit: "week" },
  { id: "newsletter", price: 299, unit: "issue" },
] as const;
