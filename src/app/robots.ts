import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/config";

// Bot policy (per geo-crawlers skill):
// - Search crawlers are explicitly allowed (Googlebot, OAI-SearchBot, ...).
// - Training-only crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended) are
//   NOT named here: they fall through to the "*" rule (allowed by default).
//   To block model training while keeping search, add e.g.
//     { userAgent: ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended"], disallow: "/" }
// - /api/ is off-limits to all crawlers (subscribe endpoint, no public value).
export default function robots(): MetadataRoute.Robots {
  const searchBots = [
    "Googlebot",
    "Googlebot-Image",
    "Bingbot",
    "DuckDuckBot",
    "Baiduspider",
    "OAI-SearchBot", // OpenAI search
    "ChatGPT-User", // user-triggered fetch, not auto-indexing
    "PerplexityBot", // Perplexity AI search
    "Applebot", // Apple search / Siri
    "YouBot", // You.com search
  ];
  return {
    rules: [
      { userAgent: searchBots, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
