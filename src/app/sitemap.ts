import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/config";
import { getCases } from "@/content/cases";
import { SHELVES, SOURCE_TYPES } from "@/content/schema";

const LANGS = ["en", "zh"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];
  const urls: MetadataRoute.Sitemap = [];
  const cases = getCases();

  for (const lang of LANGS) {
    urls.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    });

    // Category shelves — kept even when empty (sensors): the editorial
    // intro + FAQ have standalone value; the page shows a "coming soon" state.
    for (const shelf of Object.keys(SHELVES)) {
      const inShelf = cases.filter((c) => c.shelf === shelf);
      const last = inShelf.length
        ? inShelf.map((c) => c.date).sort().reverse()[0]
        : today;
      urls.push({
        url: `${SITE_URL}/${lang}/categories/${shelf}`,
        lastModified: last,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const type of Object.keys(SOURCE_TYPES)) {
      urls.push({
        url: `${SITE_URL}/${lang}/type/${type}`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const page of ["submit", "advertise"]) {
      urls.push({
        url: `${SITE_URL}/${lang}/${page}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }

    for (const c of cases) {
      urls.push({
        url: `${SITE_URL}/${lang}/builds/${c.slug}`,
        lastModified: c.date,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return urls;
}
