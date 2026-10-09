import Link from "next/link";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

// Native sponsored slot — mirrors the reference card structure:
// icon avatar + label rows, amber tint, same footprint as a case card.
export default function SponsoredCard({ lang }: { lang: Lang }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.25rem] border border-sponsor-border bg-sponsor transition-[box-shadow,border-color] duration-200 hover:shadow-md">
      <div className="px-3 pb-3 pt-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 11l18-8-8 18-2.5-7.5z" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium text-foreground">
              {t(lang, "yourAdHere")}
            </p>
            <p className="truncate text-xs text-sponsor-foreground">{t(lang, "sponsored")}</p>
          </div>
        </div>
        <p className="mt-3 text-[15px] leading-[1.45] text-foreground/90">
          {t(lang, "yourAdSub")}
        </p>
        <div className="mt-3 rounded-2xl bg-white/50 px-3 py-2.5 dark:bg-black/30">
          <p className="text-xs text-sponsor-foreground">
            <Link
              href={`/${lang}/advertise`}
              className="stretched-link font-medium underline-offset-2 hover:underline"
            >
              {t(lang, "yourAdHere")}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
