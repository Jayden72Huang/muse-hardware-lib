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
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{nodes}</div>
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
      {/* Hero — compact strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="max-w-2xl">
            <p className="inline-block rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {t(lang, "heroKicker")}
            </p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {t(lang, "heroTitle")}
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">{t(lang, "heroSub")}</p>
          </div>
          <Link
            href={`/${lang}/submit`}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {t(lang, "navSubmit")} →
          </Link>
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{t(lang, "latestBuilds")}</h2>
          <Link href={`/${lang}/submit`} className="text-sm text-primary hover:underline">
            {t(lang, "navSubmit")} →
          </Link>
        </div>
        {cases.length > 0 ? (
          <Feed items={cases} lang={lang} />
        ) : (
          <p className="rounded-[14px] border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            {t(lang, "emptyCategory")}
          </p>
        )}
      </section>

      {/* Categories */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">{t(lang, "browseCategories")}</h2>
          <CategoryNav lang={lang} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <SubscribeForm lang={lang} />
        </div>
      </section>
    </div>
  );
}
