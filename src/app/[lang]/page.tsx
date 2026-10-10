import { getCases } from "@/content/cases";
import type { CaseStudy } from "@/content/schema";
import Link from "next/link";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";
import CaseCard from "@/components/CaseCard";
import SponsoredCard from "@/components/SponsoredCard";
import SubscribeForm from "@/components/SubscribeForm";
import FilterBar from "@/components/FilterBar";
import OfficialCard from "@/components/OfficialCard";
import AsciiMascot from "@/components/AsciiMascot";
import { CategoryNav } from "@/components/Header";

import { SITE_URL } from "@/content/config";

// Official Meta resources — URLs verified live on 2026-10-09:
// - https://gadgets.muse.ai ("Muse Gadgets: Open source hardware for your Muse", official project site)
// - https://github.com/facebookincubator/muse-gadget-sdk (official SDK repo, Apache 2.0)
const OFFICIAL_LINKS = [
  {
    href: "https://gadgets.muse.ai",
    image: "https://gadgets.muse.ai/gadgets/muse-gadgets-lineup.png",
    domain: "gadgets.muse.ai",
    titleKey: "officialGadgetsTitle",
    descKey: "officialGadgetsDesc",
  },
  {
    href: "https://github.com/facebookincubator/muse-gadget-sdk",
    image: "https://opengraph.githubassets.com/1/facebookincubator/muse-gadget-sdk",
    domain: "github.com",
    titleKey: "officialSdkTitle",
    descKey: "officialSdkDesc",
  },
] as const;

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
      {/* Hero — two columns: headline + CTAs | official resources */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1680px] gap-10 px-3 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_600px] lg:items-center">
          <div>
            <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.03em] text-foreground">
              <span className="tabular-nums">{cases.length}</span>{" "}
              {t(lang, "heroPre")}{" "}
              <span className="text-primary">{t(lang, "heroMuse")}</span>
              {t(lang, "heroPost") ? ` ${t(lang, "heroPost")}` : ""}
            </h1>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.5] text-muted-foreground">
              {t(lang, "heroSub")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/${lang}/submit`}
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {t(lang, "navSubmit")}
              </Link>
              <Link
                href="#main"
                className="inline-flex h-11 items-center rounded-full border border-border bg-card px-6 text-[15px] font-medium text-foreground transition-colors hover:border-foreground/30"
              >
                {t(lang, "browseBuilds")}
              </Link>
            </div>
          </div>
          <aside aria-label={t(lang, "officialResources")} className="min-w-0">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t(lang, "officialResources")}
            </p>
            <div className="flex items-center gap-5">
              <AsciiMascot />
              <div className="grid min-w-0 flex-1 gap-3">
                {OFFICIAL_LINKS.map((l) => (
                  <OfficialCard
                    key={l.href}
                    href={l.href}
                    image={l.image}
                    title={t(lang, l.titleKey)}
                    desc={t(lang, l.descKey)}
                    domain={l.domain}
                  />
                ))}
              </div>
            </div>
          </aside>
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
