import Link from "next/link";
import { CASES } from "@/content/cases";
import { SHELVES, type Lang, type Shelf } from "@/content/schema";
import { shelfName, t, typeName } from "@/i18n/dict";

// Sticky pill filter bar — the site's "directory". Mirrors shipwithmuse.live's
// filter bar structure: sticky under header, horizontally scrollable pills
// with counts, active pill inverted.

export type FilterKey = "all" | "github" | "social" | Shelf;

interface Pill {
  key: FilterKey;
  label: string;
  count: number;
  href: string;
}

function buildPills(lang: Lang): Pill[] {
  const countShelf = (s: Shelf) => CASES.filter((c) => c.shelf === s).length;
  const countType = (t: string) => CASES.filter((c) => c.sourceType === t).length;
  const pills: Pill[] = [
    { key: "all", label: t(lang, "filterAll"), count: CASES.length, href: `/${lang}` },
    {
      key: "github",
      label: "GitHub",
      count: countType("github"),
      href: `/${lang}/type/github`,
    },
    {
      key: "social",
      label: t(lang, "filterVideos"),
      count: countType("social"),
      href: `/${lang}/type/social`,
    },
  ];
  for (const s of Object.keys(SHELVES) as Shelf[]) {
    pills.push({
      key: s,
      label: shelfName(s, lang),
      count: countShelf(s),
      href: `/${lang}/categories/${s}`,
    });
  }
  return pills;
}

export default function FilterBar({
  lang,
  active,
}: {
  lang: Lang;
  active: FilterKey;
}) {
  const pills = buildPills(lang);
  return (
    <div className="pointer-events-none sticky top-14 z-30 border-b border-border/60 bg-background/85 py-2.5 backdrop-blur">
      <div className="pointer-events-auto relative mx-auto flex max-w-[1680px] items-center gap-2 px-3 sm:px-6">
        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pills.map((p) => {
            const isActive = p.key === active;
            return (
              <Link
                key={p.key}
                href={p.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/25 hover:text-foreground"
                }`}
              >
                {p.label}
                <span className="text-xs tabular-nums opacity-60">{p.count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
