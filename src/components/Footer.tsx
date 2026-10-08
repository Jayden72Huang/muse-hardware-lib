import Link from "next/link";
import { SHELVES, SOURCE_TYPES, type Lang } from "@/content/schema";
import { shelfName, typeName, t } from "@/i18n/dict";
import SubscribeForm from "./SubscribeForm";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-bold">{t(lang, "siteName")}</p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">{t(lang, "footerAbout")}</p>
            <div className="mt-4 max-w-xs">
              <SubscribeForm lang={lang} compact />
            </div>
          </div>
          <nav aria-label="explore">
            <p className="text-sm font-bold text-zinc-300">{t(lang, "footerExplore")}</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              {(Object.keys(SHELVES) as (keyof typeof SHELVES)[]).map((s) => (
                <li key={s}>
                  <Link href={`/${lang}/categories/${s}`} className="hover:text-orange-400">
                    {shelfName(s, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="contribute">
            <p className="text-sm font-bold text-zinc-300">{t(lang, "footerContribute")}</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li>
                <Link href={`/${lang}/submit`} className="hover:text-orange-400">
                  {t(lang, "navSubmit")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/advertise`} className="hover:text-orange-400">
                  {t(lang, "navAdvertise")}
                </Link>
              </li>
              {(Object.keys(SOURCE_TYPES) as (keyof typeof SOURCE_TYPES)[]).map((ty) => (
                <li key={ty}>
                  <Link href={`/${lang}/type/${ty}`} className="hover:text-orange-400">
                    {typeName(ty, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-zinc-800/60 pt-4 text-xs text-zinc-600">
          © 2026 {t(lang, "siteName")}. {t(lang, "footerRights")}
        </p>
      </div>
    </footer>
  );
}
