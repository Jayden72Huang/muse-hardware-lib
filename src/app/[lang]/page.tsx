import Link from "next/link";
import { getCases } from "@/content/cases";
import type { CaseStudy } from "@/content/schema";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";
import CaseCard from "@/components/CaseCard";
import SponsoredCard from "@/components/SponsoredCard";
import SubscribeForm from "@/components/SubscribeForm";
import { CategoryNav } from "@/components/Header";

import { SITE_URL } from "@/content/config";

function Feed({ items, lang }: { items: CaseStudy[]; lang: Lang }) {
  const nodes: React.ReactNode[] = [];
  items.forEach((c, i) => {
    if (i > 0 && i % 8 === 0) {
      nodes.push(<SponsoredCard key={`ad-${i}`} lang={lang} />);
    }
    nodes.push(<CaseCard key={c.slug} c={c} lang={lang} />);
  });
  // Always show one sponsored slot even with few builds
  if (items.length > 0 && items.length < 8) {
    nodes.push(<SponsoredCard key="ad-tail" lang={lang} />);
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{nodes}</div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const cases = getCases();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Muse Hardware Library",
        alternateName: "Muse 硬件案例库",
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name:
          lang === "zh"
            ? "Muse 硬件案例库 — 用 Muse 做出来的真实硬件"
            : "Muse Hardware Library — Real Hardware Built with Muse",
        inLanguage: ["en", "zh"],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
            {t(lang, "heroKicker")}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t(lang, "heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t(lang, "heroSub")}
          </p>
          <div className="mt-6 max-w-xl">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              type="search"
              disabled
              placeholder={t(lang, "searchPlaceholder")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-400 placeholder:text-zinc-600 disabled:opacity-70"
            />
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">{t(lang, "latestBuilds")}</h2>
          <Link href={`/${lang}/submit`} className="text-sm text-orange-400 hover:underline">
            {t(lang, "navSubmit")} →
          </Link>
        </div>
        {cases.length > 0 ? (
          <Feed items={cases} lang={lang} />
        ) : (
          <p className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center text-sm text-zinc-500">
            {t(lang, "emptyCategory")}
          </p>
        )}
      </section>

      {/* Categories */}
      <section className="border-t border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-4 text-xl font-bold">{t(lang, "browseCategories")}</h2>
          <CategoryNav lang={lang} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-zinc-800/60 bg-zinc-900/40">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <SubscribeForm lang={lang} />
        </div>
      </section>
    </div>
  );
}
