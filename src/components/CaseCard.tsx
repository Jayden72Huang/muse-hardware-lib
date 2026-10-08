import Link from "next/link";
import { t, typeName } from "@/i18n/dict";
import type { CaseStudy, Lang } from "@/content/schema";

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

export default function CaseCard({ c, lang }: { c: CaseStudy; lang: Lang }) {
  return (
    <article className="case-card flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
      <Link href={`/${lang}/builds/${c.slug}`} className="block" aria-label={c.title[lang]}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-800">
          {c.image ? (
            // plain img to avoid remote-domain config for arbitrary source thumbnails
            <img
              src={c.image}
              alt={c.title[lang]}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950">
              <span className="font-mono text-4xl font-bold text-zinc-700">
                №{c.number}
              </span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-md bg-zinc-950/80 px-2 py-1 font-mono text-xs text-orange-400">
            № {c.number}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <SourceBadge type={c.sourceType} lang={lang} />
        </div>
        <Link href={`/${lang}/builds/${c.slug}`}>
          <h3 className="text-base font-semibold leading-snug text-zinc-100 hover:text-orange-400">
            {c.title[lang]}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-zinc-400">{c.summary[lang]}</p>
        <p className="mt-auto pt-2 text-xs text-zinc-500">
          {t(lang, "by")} {c.author.name}
        </p>
      </div>
    </article>
  );
}
