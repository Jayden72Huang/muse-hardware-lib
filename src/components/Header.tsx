import Link from "next/link";
import { SHELVES, type Lang } from "@/content/schema";
import { shelfName, t } from "@/i18n/dict";

export default function Header({ lang }: { lang: Lang }) {
  const other: Lang = lang === "zh" ? "en" : "zh";
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2">
        {t(lang, "skipToContent")}
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 font-mono text-sm font-bold text-zinc-950">
            M
          </span>
          <span className="text-sm font-bold tracking-tight sm:text-base">
            {t(lang, "siteName")}
          </span>
        </Link>
        <nav aria-label="main" className="flex items-center gap-1 text-sm sm:gap-2">
          <Link href={`/${lang}`} className="hidden rounded-md px-2 py-1.5 text-zinc-300 hover:text-orange-400 sm:block">
            {t(lang, "navHome")}
          </Link>
          <Link
            href={`/${lang}/categories/smart-home`}
            className="hidden rounded-md px-2 py-1.5 text-zinc-300 hover:text-orange-400 sm:block"
          >
            {t(lang, "navCategories")}
          </Link>
          <Link
            href={`/${lang}/submit`}
            className="rounded-md px-2 py-1.5 text-zinc-300 hover:text-orange-400"
          >
            {t(lang, "navSubmit")}
          </Link>
          <Link
            href={`/${lang}/advertise`}
            className="rounded-md border border-orange-500/50 px-2.5 py-1 text-orange-400 hover:bg-orange-500/10"
          >
            {t(lang, "navAdvertise")}
          </Link>
          <Link
            href={`/${other}`}
            className="rounded-md px-2 py-1.5 font-medium text-zinc-400 hover:text-zinc-100"
            aria-label="switch language"
          >
            {t(lang, "langSwitch")}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function CategoryNav({ lang }: { lang: Lang }) {
  return (
    <nav aria-label="categories" className="flex flex-wrap gap-2">
      {(Object.keys(SHELVES) as (keyof typeof SHELVES)[]).map((s) => (
        <Link
          key={s}
          href={`/${lang}/categories/${s}`}
          className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300 hover:border-orange-500/60 hover:text-orange-400"
        >
          {shelfName(s, lang)}
        </Link>
      ))}
    </nav>
  );
}
