import Link from "next/link";
import { t, typeName, shelfName } from "@/i18n/dict";
import type { CaseStudy, Lang } from "@/content/schema";
import CardCover from "./CardCover";

export function SourceBadge({ type, lang }: { type: CaseStudy["sourceType"]; lang: Lang }) {
  return <span className="text-xs text-muted-foreground">{typeName(type, lang)}</span>;
}

const glyphBg: Record<string, string> = {
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
      aria-hidden
      style={{ width: 17, height: 17 }}
      className={`absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full text-white ring-2 ring-card ${glyphBg[type]}`}
    >
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
    <article className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-card transition-[box-shadow,border-color] duration-200 hover:border-foreground/25 hover:shadow-md">
      <div className="px-3 pb-3 pt-3">
        {/* author row */}
        <div className="flex items-center gap-3">
          <span className="relative shrink-0" style={{ width: 40, height: 40 }}>
            <span
              className="grid place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent"
              style={{ width: 40, height: 40 }}
            >
              {initial}
            </span>
            <TypeGlyph type={c.sourceType} />
          </span>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>

        {/* summary */}
        <p className="mt-3 text-[15px] leading-[1.45] text-foreground/90">
          {c.summary[lang]}
        </p>

        {/* cover */}
        <div className="relative mt-3 overflow-hidden rounded-xl border border-border bg-muted">
          <div className="aspect-[16/10] w-full">
            <CardCover c={c} lang={lang} />
          </div>
        </div>
      </div>

      {/* meta bar + title */}
      <div className="mx-3 mb-3 rounded-2xl bg-muted px-3 py-2.5">
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
            {typeName(c.sourceType, lang)} · {shelfName(c.shelf, lang)}
          </p>
          <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[11px] font-bold text-accent">
            № {c.number}
          </span>
        </div>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          <Link
            href={`/${lang}/builds/${c.slug}`}
            className="stretched-link after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none"
          >
            {c.title[lang]}
          </Link>
        </h3>
      </div>
    </article>
  );
}
