import Link from "next/link";
import { t, typeName } from "@/i18n/dict";
import type { CaseStudy, Lang } from "@/content/schema";
import CardCover from "./CardCover";

const badgeColor: Record<string, string> = {
  github: "border-zinc-600 bg-zinc-800/60 text-zinc-200",
  video: "border-red-500/40 bg-red-500/10 text-red-300",
  article: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  social: "border-violet-500/40 bg-violet-500/10 text-violet-300",
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

function sourceDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function CaseCard({ c, lang }: { c: CaseStudy; lang: Lang }) {
  const isVideo = c.sourceType === "video" || c.sourceType === "social";
  return (
    <article className="case-card group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 transition-colors hover:border-zinc-700">
      <Link href={`/${lang}/builds/${c.slug}`} className="block" aria-label={c.title[lang]}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-800">
          <CardCover c={c} lang={lang} />
          <span className="absolute left-3 top-3 rounded-md bg-zinc-950/80 px-2 py-1 font-mono text-xs text-orange-400">
            № {c.number}
          </span>
          {isVideo && (
            <span
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950/80 text-white"
              aria-label="video"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M4 2.5v11l9-5.5-9-5.5z" />
              </svg>
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <SourceBadge type={c.sourceType} lang={lang} />
          <span className="text-xs text-zinc-600">{sourceDomain(c.sourceUrl)}</span>
        </div>
        <Link href={`/${lang}/builds/${c.slug}`}>
          <h3 className="text-base font-semibold leading-snug text-zinc-100 group-hover:text-orange-400">
            {c.title[lang]}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-zinc-400">{c.summary[lang]}</p>
        {c.hardware.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {c.hardware.slice(0, 2).map((h) => (
              <span
                key={h}
                className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[11px] text-zinc-500"
              >
                {h}
              </span>
            ))}
          </div>
        )}
        <p className="mt-auto pt-2 text-xs text-zinc-500">
          {t(lang, "by")} <span className="text-zinc-400">@{c.author.name}</span>
        </p>
      </div>
    </article>
  );
}
