import Link from "next/link";
import { SHELVES, type Lang } from "@/content/schema";
import { shelfName, t } from "@/i18n/dict";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

function WaveMark() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-primary">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 13c2.5 0 2.5-6 5-6s2.5 10 5 10 2.5-8 5-8 2 4 3.5 4"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="19.5" cy="6.5" r="1.6" fill="#fff" />
      </svg>
    </span>
  );
}

export default function Header({
  lang,
  activeNav = "home",
}: {
  lang: Lang;
  activeNav?: "home" | "categories" | "submit" | "advertise";
}) {
  const other: Lang = lang === "zh" ? "en" : "zh";
  const linkCls = (key: string) =>
    `whitespace-nowrap px-2 py-1.5 transition-colors ${
      activeNav === key
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2">
        {t(lang, "skipToContent")}
      </a>
      <div className="mx-auto flex h-14 max-w-[1680px] items-center gap-2 px-3 sm:gap-4 sm:px-6">
        <MobileNav lang={lang}>
          <Sidebar lang={lang} />
        </MobileNav>
        <Link
          href={`/${lang}`}
          className="flex min-w-0 shrink-0 items-center gap-2"
          aria-label={t(lang, "siteName")}
        >
          <WaveMark />
          <span
            aria-hidden
            className="truncate text-[17px] font-semibold tracking-[-0.02em]"
          >
            <span className="text-foreground">muse</span>
            <span className="text-primary">hardware</span>
          </span>
        </Link>
        <nav aria-label="main" className="hidden items-center gap-1 text-sm md:flex lg:gap-2">
          <Link href={`/${lang}`} className={linkCls("home")} aria-current={activeNav === "home" ? "page" : undefined}>
            {t(lang, "navHome")}
          </Link>
          <Link href={`/${lang}/categories/dev-boards`} className={linkCls("categories")}>
            {t(lang, "navCategories")}
          </Link>
          <Link href={`/${lang}/submit`} className={linkCls("submit")}>
            {t(lang, "navSubmit")}
          </Link>
          <Link href={`/${lang}/advertise`} className={linkCls("advertise")}>
            {t(lang, "navAdvertise")}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle lang={lang} />
          <Link
            href={`/${other}`}
            className="rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="switch language"
          >
            {t(lang, "langSwitch")}
          </Link>
          <Link
            href={`/${lang}/submit`}
            className="inline-flex h-8 items-center rounded-full bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            {t(lang, "navSubmit")}
          </Link>
        </div>
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
