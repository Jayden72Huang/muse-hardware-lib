import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCases } from "@/content/cases";
import { SOURCE_TYPES, type Lang, type SourceType } from "@/content/schema";
import { typeName, t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import CaseCard from "@/components/CaseCard";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {t(lang, "source")}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {typeName(type, lang)}
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
        {TYPE_INTRO[type][lang]}
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cases.map((c) => (
          <CaseCard key={c.slug} c={c} lang={lang} />
        ))}
      </div>
      {cases.length === 0 && (
        <p className="mt-4 rounded-[14px] border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          {t(lang, "emptyType")}
        </p>
      )}
    </div>
  );
}
