import Link from "next/link";
import { SHELVES, SOURCE_TYPES, type Lang } from "@/content/schema";
import { shelfName, typeName, t } from "@/i18n/dict";
import SubscribeForm from "./SubscribeForm";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1680px] px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-bold tracking-tight">
              <span className="text-foreground">muse</span>
              <span className="text-primary">hardware</span>
              <span className="text-muted-foreground">…</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t(lang, "footerAbout")}
            </p>
            <div className="mt-5 max-w-sm">
              <SubscribeForm lang={lang} compact />
            </div>
          </div>
          <nav aria-label="explore">
            <p className="text-sm font-bold text-foreground">{t(lang, "footerExplore")}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {(Object.keys(SHELVES) as (keyof typeof SHELVES)[]).map((s) => (
                <li key={s}>
                  <Link href={`/${lang}/categories/${s}`} className="hover:text-primary">
                    {shelfName(s, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="contribute">
            <p className="text-sm font-bold text-foreground">{t(lang, "footerContribute")}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${lang}/submit`} className="hover:text-primary">
                  {t(lang, "navSubmit")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/advertise`} className="hover:text-primary">
                  {t(lang, "navAdvertise")}
                </Link>
              </li>
              {(Object.keys(SOURCE_TYPES) as (keyof typeof SOURCE_TYPES)[]).map((ty) => (
                <li key={ty}>
                  <Link href={`/${lang}/type/${ty}`} className="hover:text-primary">
                    {typeName(ty, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-border pt-5 text-xs text-muted-foreground">
          © 2026 {t(lang, "siteName")}. {t(lang, "footerRights")}
        </p>
      </div>
    </footer>
  );
}
