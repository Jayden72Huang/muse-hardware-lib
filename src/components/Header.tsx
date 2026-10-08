import Link from "next/link";
import { SHELVES, type Lang } from "@/content/schema";
import { shelfName, t } from "@/i18n/dict";

function WaveMark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 12c2 0 2-5 4-5s2 10 4 10 2-10 4-10 2 5 4 5"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const other: Lang = lang === "zh" ? "en" : "zh";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2">
        {t(lang, "skipToContent")}
      </a>
      <div className="mx-auto flex h-14 max-w-[1680px] items-center justify-between gap-4 px-4">
        <Link href={`/${lang}`} className="flex items-center gap-2" aria-label={t(lang, "siteName")}>
          <WaveMark />
          <span className="text-[15px] font-bold tracking-tight">
            <span className="text-foreground">muse</span>
            <span className="text-primary">hardware</span>
            <span className="text-muted-foreground">…</span>
          </span>
        </Link>
        <nav aria-label="main" className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href={`/${lang}`}
            className="hidden rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground sm:block"
          >
            {t(lang, "navHome")}
          </Link>
          <Link
            href={`/${lang}/categories/smart-home`}
            className="hidden rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground sm:block"
          >
            {t(lang, "navCategories")}
          </Link>
          <Link
            href={`/${lang}/submit`}
            className="rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground"
          >
            {t(lang, "navSubmit")}
          </Link>
          <Link
            href={`/${lang}/advertise`}
            className="rounded-full border border-primary/40 px-3 py-1 text-primary hover:bg-primary/5"
          >
            {t(lang, "navAdvertise")}
          </Link>
          <Link
            href={`/${other}`}
            className="rounded-md px-2 py-1.5 font-medium text-muted-foreground hover:text-foreground"
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
          className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {shelfName(s, lang)}
        </Link>
      ))}
    </nav>
  );
}
