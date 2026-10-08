import Link from "next/link";
import { t, typeName, shelfName } from "@/i18n/dict";
import type { CaseStudy, Lang } from "@/content/schema";
import CardCover from "./CardCover";
import DifficultyStars from "./DifficultyStars";

const badgeColor: Record<string, string> = {
  github: "border-border bg-muted text-foreground",
  video: "border-red-200 bg-red-50 text-red-700",
  article: "border-sky-200 bg-sky-50 text-sky-700",
  social: "border-violet-200 bg-violet-50 text-violet-700",
};

export function SourceBadge({ type, lang }: { type: CaseStudy["sourceType"]; lang: Lang }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeColor[type]}`}
    >
      {typeName(type, lang)}
    </span>
  );
}

const glyphColor: Record<string, string> = {
  github: "bg-foreground",
  video: "bg-red-500",
  article: "bg-sky-500",
  social: "bg-violet-500",
};

function TypeGlyph({ type }: { type: CaseStudy["sourceType"] }) {
  const paths: Record<string, React.ReactNode> = {
    github: <path d="M6 4l-4 4 4 4M10 4l4 4-4 4" />,
    video: <path d="M7 5l5 3-5 3z" fill="currentColor" stroke="none" />,
    article: <path d="M5 3h6l3 3v8H5z M11 3v3h3" />,
    social: <path d="M4 5h8v5H7l-3 2z" />,
  };
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${glyphColor[type]}`}
      aria-hidden
    >
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {paths[type]}
      </svg>
    </span>
  );
}

function sourceDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function CaseCard({ c, lang }: { c: CaseStudy; lang: Lang }) {
  const initial = (c.author.name || "?").trim().charAt(0).toUpperCase();
  return (
    <article className="case-card group relative flex flex-col overflow-hidden rounded-[14px] border border-border bg-card">
      {/* author row */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="relative h-10 w-10 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-accent">
            {initial}
          </span>
          <span className="absolute -bottom-0.5 -right-0.5">
            <TypeGlyph type={c.sourceType} />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-foreground">
            {c.author.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            @{c.author.name} · {sourceDomain(c.sourceUrl)}
          </p>
        </div>
        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(lang, "detailViewSource")}
          className="relative z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7.5 8.5" />
          </svg>
        </a>
      </div>

      {/* title + summary */}
      <div className="px-4 pt-3">
        <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
          <Link href={`/${lang}/builds/${c.slug}`} className="stretched-link">
            {c.title[lang]}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[15px] leading-[1.45] text-foreground/80">
          {c.summary[lang]}
        </p>
      </div>

      {/* cover */}
      <div className="px-4 pt-3">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted">
          <CardCover c={c} lang={lang} />
        </div>
      </div>

      {/* meta row */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-4">
        <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[11px] font-bold text-accent">
          № {c.number}
        </span>
        <Link
          href={`/${lang}/categories/${c.shelf}`}
          className="relative z-10 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {shelfName(c.shelf, lang)}
        </Link>
        <DifficultyStars value={c.difficulty} lang={lang} />
        {c.hardware.slice(0, 2).map((h) => (
          <span
            key={h}
            className="rounded border border-border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground"
          >
            {h}
          </span>
        ))}
      </div>
    </article>
  );
}
