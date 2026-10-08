import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCase, getCases, getRelated } from "@/content/cases";
import { shelfName, t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import type { Lang } from "@/content/schema";
import CaseCard, { SourceBadge } from "@/components/CaseCard";
import CardCover from "@/components/CardCover";
import DifficultyStars from "@/components/DifficultyStars";

// Prerender known slugs; if the case list is still empty at build time,
// emit a sentinel so generateStaticParams never returns [] (Cache Components
// requirement). The sentinel renders the not-found page.
export async function generateStaticParams() {
  const slugs = getCases().map((c) => c.slug);
  const safe = slugs.length > 0 ? slugs : ["__none__"];
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "zh"]) {
    for (const slug of safe) params.push({ lang, slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const c = getCase(slug);
  if (!c) return {};
  const path = `/${lang}/builds/${slug}`;
  return {
    title: `${c.title[lang]} — ${t(lang, "siteName")}`,
    description: c.summary[lang],
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/builds/${slug}`,
        zh: `${SITE_URL}/zh/builds/${slug}`,
      },
    },
    openGraph: {
      title: c.title[lang],
      description: c.summary[lang],
      type: "article",
      url: `${SITE_URL}${path}`,
      ...(c.image ? { images: [{ url: c.image }] } : {}),
    },
  };
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const c = getCase(slug);
  if (!c) notFound();
  const related = getRelated(c, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: c.title[lang],
        description: c.summary[lang],
        inLanguage: [lang],
        datePublished: c.date,
        author: { "@type": "Person", name: c.author.name },
        mainEntityOfPage: `${SITE_URL}/${lang}/builds/${c.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t(lang, "siteName"),
            item: `${SITE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: shelfName(c.shelf, lang),
            item: `${SITE_URL}/${lang}/categories/${c.shelf}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: c.title[lang],
            item: `${SITE_URL}/${lang}/builds/${c.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href={`/${lang}`} className="text-sm text-muted-foreground hover:text-primary">
        ← {t(lang, "detailBack")}
      </Link>

      <article className="mt-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-sm font-bold text-accent">
            {t(lang, "buildNo")} {c.number}
          </span>
          <SourceBadge type={c.sourceType} lang={lang} />
          <Link
            href={`/${lang}/categories/${c.shelf}`}
            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {shelfName(c.shelf, lang)}
          </Link>
        </div>

        <h1 className="mt-4 max-w-[20ch] text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
          {c.title[lang]}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.summary[lang]}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-base font-bold text-accent">
            {(c.author.name || "?").trim().charAt(0).toUpperCase()}
          </span>
          <div className="text-sm">
            <p className="font-medium text-foreground">
              {c.author.url ? (
                <a
                  href={c.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  {c.author.name}
                </a>
              ) : (
                c.author.name
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {t(lang, "detailPublished")}: <time dateTime={c.date}>{c.date}</time>
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
          {c.image ? (
            <img
              src={c.image}
              alt={c.title[lang]}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="aspect-[16/9] w-full">
              <CardCover c={c} lang={lang} />
            </div>
          )}
        </div>

        <div className="mt-6 max-w-none">
          <p className="leading-relaxed text-foreground/85">{c.description[lang]}</p>
        </div>

        {c.quote && (
          <blockquote className="mt-6 rounded-r-[14px] border-l-4 border-primary bg-muted/60 px-5 py-4">
            <p className="text-[15px] italic leading-relaxed text-foreground/85">
              “{c.quote[lang]}”
            </p>
            <cite className="mt-2 block text-xs not-italic text-muted-foreground">
              — {c.quote.by} · {t(lang, "detailQuoteFrom")}
            </cite>
          </blockquote>
        )}

        {/* Hardware fields */}
        <section className="mt-8 rounded-[14px] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-lg font-bold text-foreground">{t(lang, "detailHardware")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.hardware.map((h) => (
              <span
                key={h}
                className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs font-medium text-accent"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{t(lang, "detailDifficulty")}:</span>
            <DifficultyStars value={c.difficulty} lang={lang} />
            <span className="text-xs text-muted-foreground/70">{t(lang, "difficultyHint")}</span>
          </div>

          {c.bom.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-bold text-foreground">{t(lang, "detailBom")}</h3>
              <div className="mt-2 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {c.bom.map((b, i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-muted/60" : "bg-card"}>
                        <td className="px-4 py-2.5 text-foreground/85">{b.item[lang]}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-right">
                          {b.cost && (
                            <span className="font-mono text-xs font-medium text-accent">{b.cost}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {c.buyLinks.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-bold text-foreground">{t(lang, "detailBuy")}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.buyLinks.map((b, i) => (
                  <a
                    key={i}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    {b.label[lang]} ↗
                  </a>
                ))}
              </div>
            </>
          )}

          {c.officialReference && (
            <p className="mt-4 text-xs text-muted-foreground/70">
              Meta official reference: {c.officialReference}
            </p>
          )}
        </section>

        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t(lang, "detailViewSource")} ↗
        </a>
      </article>

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">{t(lang, "detailRelated")}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <CaseCard key={r.slug} c={r} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
