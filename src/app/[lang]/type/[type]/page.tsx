import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCases } from "@/content/cases";
import { SOURCE_TYPES, type Lang, type SourceType } from "@/content/schema";
import { typeName, t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import CaseCard from "@/components/CaseCard";
import FilterBar from "@/components/FilterBar";
import Sidebar from "@/components/Sidebar";
import type { FilterKey } from "@/components/FilterBar";

const TYPES = Object.keys(SOURCE_TYPES) as SourceType[];

export async function generateStaticParams() {
  const params: { lang: string; type: string }[] = [];
  for (const lang of ["en", "zh"]) for (const type of TYPES) params.push({ lang, type });
  return params;
}

const TYPE_INTRO: Record<SourceType, { en: string; zh: string }> = {
  github: {
    en: "Open-source builds you can clone, flash and fork. Code-first Muse hardware projects from the community.",
    zh: "可以克隆、烧录、fork 的开源构建。社区贡献的代码优先型 Muse 硬件项目。",
  },
  video: {
    en: "Watch it work. Demos, teardowns and build logs — the fastest way to judge a project before you build it.",
    zh: "看它跑起来。演示、拆解和制作记录 —— 动手之前判断一个项目最快的方式。",
  },
  article: {
    en: "Long-form write-ups: tutorials, reviews and deep dives into Muse hardware builds.",
    zh: "长文记录：教程、评测，以及 Muse 硬件构建的深度解析。",
  },
  social: {
    en: "Fresh from the feed. Short demos and announcements from makers on social platforms.",
    zh: "来自信息流的新鲜事。创客们在社交平台上的短演示和新发布。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; type: string }>;
}): Promise<Metadata> {
  const { lang, type } = (await params) as { lang: Lang; type: SourceType };
  if (!SOURCE_TYPES[type]) return {};
  const path = `/${lang}/type/${type}`;
  return {
    title: `${typeName(type, lang)} — ${t(lang, "siteName")}`,
    description: TYPE_INTRO[type][lang],
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/type/${type}`,
        zh: `${SITE_URL}/zh/type/${type}`,
      },
    },
  };
}

export default async function TypePage({
  params,
}: {
  params: Promise<{ lang: string; type: string }>;
}) {
  const { lang, type } = (await params) as { lang: Lang; type: SourceType };
  if (!SOURCE_TYPES[type]) notFound();
  const cases = getCases().filter((c) => c.sourceType === type);
  // FilterBar only has pills for github/social shelves; video/article pages
  // leave the pill row unhighlighted via "all".
  const activePill: FilterKey = type === "github" ? "github" : type === "social" ? "social" : "all";

  return (
    <div>
      {/* Title block: breadcrumb → H1 → intro (above the filter bar) */}
      <div className="mx-auto max-w-[1680px] px-3 pt-8 sm:px-6 sm:pt-10">
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link href={`/${lang}`} className="transition-colors hover:text-foreground">
            {t(lang, "catalogCrumb")}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-accent">{t(lang, "typeCrumb")}</span>
        </nav>
        <h1 className="mt-2 max-w-[16ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
          {typeName(type, lang)}
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {TYPE_INTRO[type][lang]}
        </p>
      </div>

      <FilterBar lang={lang} active={activePill} />

      <div className="mx-auto max-w-[1680px] px-3 py-8 sm:px-6">
        <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <Sidebar lang={lang} activeType={type === "github" || type === "social" ? type : undefined} />
          </aside>
          <div id="main">
            <p className="mb-4 text-sm text-muted-foreground">
              <span className="font-medium tabular-nums text-foreground">{cases.length}</span>{" "}
              {t(lang, "buildsUnit")}
            </p>
            {cases.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {cases.map((c) => (
                  <CaseCard key={c.slug} c={c} lang={lang} />
                ))}
              </div>
            ) : (
              <p className="rounded-[14px] border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                {t(lang, "emptyType")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
