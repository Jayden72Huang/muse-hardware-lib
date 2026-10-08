// Content model for the Muse Hardware Library.
// Cases live in src/content/cases.ts. Bilingual: every user-facing string has { en, zh }.
// Shelves (categories) and source types map to programmatic SEO URL space.

export type Lang = "en" | "zh";

export type Shelf =
  | "smart-home"
  | "robots"
  | "wearable"
  | "dev-boards"
  | "sensors"
  | "displays";

export type SourceType = "github" | "video" | "article" | "social";

export interface LocalText {
  en: string;
  zh: string;
}

export interface BomItem {
  item: LocalText;
  /** approximate unit cost, e.g. "$18.99" / "约 ¥135" */
  cost?: string;
}

export interface BuyLink {
  label: LocalText;
  url: string;
}

export interface CaseStudy {
  /** url slug, kebab-case */
  slug: string;
  /** sequential build number, "0001" — assigned by publish date desc, oldest published = 0001 */
  number: string;
  shelf: Shelf;
  sourceType: SourceType;
  /** canonical public source link (Receipts principle: must be a real public URL) */
  sourceUrl: string;
  title: LocalText;
  /** one-line summary for cards */
  summary: LocalText;
  /** 2-4 sentence editorial description */
  description: LocalText;
  author: { name: string; url?: string };
  /** ISO date of the source publication */
  date: string;
  hardware: string[];
  bom: BomItem[];
  /** 1 (weekend project) .. 5 (hardcore) */
  difficulty: 1 | 2 | 3 | 4 | 5;
  buyLinks: BuyLink[];
  /** short quote from the original source, attributed */
  quote?: LocalText & { by: string };
  /** og:image or thumbnail URL; if empty, card renders a generated placeholder */
  image?: string;
  /** 8 official Meta examples may be referenced here by name */
  officialReference?: string;
}

export const SHELVES: Record<Shelf, LocalText & { slug: Shelf }> = {
  "smart-home": {
    slug: "smart-home",
    en: "Smart Home",
    zh: "智能家居",
  },
  robots: { slug: "robots", en: "Robots", zh: "机器人" },
  wearable: { slug: "wearable", en: "Wearables", zh: "可穿戴" },
  "dev-boards": { slug: "dev-boards", en: "Dev Boards in Action", zh: "开发板实战" },
  sensors: { slug: "sensors", en: "Sensors", zh: "传感器" },
  displays: { slug: "displays", en: "Displays & E-Ink", zh: "显示与墨水屏" },
};

export const SOURCE_TYPES: Record<SourceType, LocalText & { slug: SourceType }> = {
  github: { slug: "github", en: "GitHub", zh: "GitHub 开源" },
  video: { slug: "video", en: "Video", zh: "视频" },
  article: { slug: "article", en: "Article", zh: "文章" },
  social: { slug: "social", en: "Social", zh: "社交媒体" },
};

export const LANGS: Lang[] = ["en", "zh"];
export const DEFAULT_LANG: Lang = "en";
