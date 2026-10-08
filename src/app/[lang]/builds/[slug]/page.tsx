import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCase, getCases, getRelated } from "@/content/cases";
import { shelfName, t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import type { Lang } from "@/content/schema";
import CaseCard, { SourceBadge } from "@/components/CaseCard";
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
      <Link href={`/${lang}`} className="text-sm text-zinc-500 hover:text-orange-400">
        {t(lang, "detailBack")}
      </Link>

      <article className="mt-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-bold text-orange-400">
            {t(lang, "buildNo")} {c.number}
          </span>
          <SourceBadge type={c.sourceType} lang={lang} />
          <Link
            href={`/${lang}/categories/${c.shelf}`}
            className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-300 hover:border-orange-500/60 hover:text-orange-400"
          >
            {shelfName(c.shelf, lang)}
          </Link>
        </div>

        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">
          {c.title[lang]}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-400">{c.summary[lang]}</p>

        <p className="mt-4 text-sm text-zinc-500">
          {t(lang, "by")}{" "}
          {c.author.url ? (
            <a
              href={c.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-orange-400"
            >
              {c.author.name}
            </a>
          ) : (
            <span className="text-zinc-300">{c.author.name}</span>
          )}{" "}
          · {t(lang, "detailPublished")}:{" "}
          <time dateTime={c.date}>{c.date}</time>
        </p>

        {c.image && (
          <img
            src={c.image}
            alt={c.title[lang]}
            loading="lazy"
            className="mt-6 w-full rounded-xl border border-zinc-800 object-cover"
          />
        )}

        <div className="prose-sm mt-6 max-w-none text-zinc-300">
          <p className="leading-relaxed">{c.description[lang]}</p>
        </div>

        {c.quote && (
          <blockquote className="mt-6 rounded-lg border-l-4 border-orange-500 bg-zinc-900/60 px-5 py-4">
            <p className="text-sm italic leading-relaxed text-zinc-300">
              “{c.quote[lang]}”
            </p>
            <cite className="mt-2 block text-xs not-italic text-zinc-500">
              — {c.quote.by} · {t(lang, "detailQuoteFrom")}
            </cite>
          </blockquote>
        )}

        {/* Hardware fields */}
        <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="text-lg font-bold">{t(lang, "detailHardware")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.hardware.map((h) => (
              <span
                key={h}
                className="rounded-md bg-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-200"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-zinc-400">{t(lang, "detailDifficulty")}:</span>
            <DifficultyStars value={c.difficulty} lang={lang} />
            <span className="text-xs text-zinc-600">{t(lang, "difficultyHint")}</span>
          </div>

          {c.bom.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-bold text-zinc-200">{t(lang, "detailBom")}</h3>
              <ul className="mt-2 divide-y divide-zinc-800/60 text-sm">
                {c.bom.map((b, i) => (
                  <li key={i} className="flex items-center justify-between py-2">
                    <span className="text-zinc-300">{b.item[lang]}</span>
                    {b.cost && (
                      <span className="font-mono text-xs text-orange-400">{b.cost}</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {c.buyLinks.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-bold text-zinc-200">{t(lang, "detailBuy")}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.buyLinks.map((b, i) => (
                  <a
                    key={i}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:border-orange-500/60 hover:text-orange-400"
                  >
                    {b.label[lang]} ↗
                  </a>
                ))}
              </div>
            </>
          )}

          {c.officialReference && (
            <p className="mt-4 text-xs text-zinc-600">
              Meta official reference: {c.officialReference}
            </p>
          )}
        </section>

        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-orange-400"
        >
          {t(lang, "detailViewSource")} ↗
        </a>
      </article>

      {related.length > 0 && (
        <section className="mt-12 border-t border-zinc-800/60 pt-8">
          <h2 className="mb-4 text-xl font-bold">{t(lang, "detailRelated")}</h2>
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
