import { getCases } from "@/content/cases";
import type { CaseStudy } from "@/content/schema";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";
import CaseCard from "@/components/CaseCard";
import SponsoredCard from "@/components/SponsoredCard";
import SubscribeForm from "@/components/SubscribeForm";
import FilterBar from "@/components/FilterBar";
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
      {/* Hero — big-number headline, compact */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1680px] px-3 py-10 sm:px-6 sm:py-14">
          <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.03em] text-foreground">
            <span className="tabular-nums">{cases.length}</span>{" "}
            {t(lang, "heroPre")}{" "}
            <span className="text-primary">{t(lang, "heroMuse")}</span>
            {t(lang, "heroPost") ? ` ${t(lang, "heroPost")}` : ""}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.5] text-muted-foreground">
            {t(lang, "heroSub")}
          </p>
        </div>
      </section>

      {/* Sticky filter bar — the directory */}
      <FilterBar lang={lang} active="all" />

      {/* Feed */}
      <section id="main" className="mx-auto max-w-[1680px] px-3 py-8 sm:px-6">
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
        <div className="mx-auto max-w-[1680px] px-3 py-10 sm:px-6">
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
