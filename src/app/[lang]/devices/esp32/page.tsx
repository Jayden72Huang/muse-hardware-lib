import type { Metadata } from "next";
import Link from "next/link";
import { getCases } from "@/content/cases";
import type { CaseStudy, Lang } from "@/content/schema";
import { t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import CaseCard from "@/components/CaseCard";
import Faq from "@/components/Faq";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

/** Boards whose hardware/bom/title/description mention ESP32 (case-insensitive). */
function isEsp32Build(c: CaseStudy): boolean {
  const hay = [
    ...c.hardware,
    c.title.en,
    c.title.zh,
    c.description.en,
    c.description.zh,
    ...c.bom.map((b) => `${b.item.en} ${b.item.zh}`),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes("esp32");
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Muse ESP32 Projects — Real Community Builds",
    description:
      "Real muse esp32 projects from the community: ESP32-S3, ESP32-C3 and ESP32-C6 builds — pocket AI agents, wearables, SDK ports and beginner guides.",
  },
  zh: {
    title: "Muse ESP32 项目 — 社区真实案例",
    description:
      "社区真实的 Muse ESP32 项目：ESP32-S3、ESP32-C3、ESP32-C6 构建——口袋 AI Agent、可穿戴、SDK 移植与新手教程。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const path = `/${lang}/devices/esp32`;
  return {
    title: META[lang].title,
    description: META[lang].description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/devices/esp32`,
        zh: `${SITE_URL}/zh/devices/esp32`,
      },
    },
  };
}

const FAQ: { q: { en: string; zh: string }; a: { en: string; zh: string } }[] = [
  {
    q: { en: "Why is ESP32 the go-to board for Muse gadgets?", zh: "为什么做 Muse gadget 都选 ESP32？" },
    a: {
      en: "The official Muse gadget SDK is built around ESP32 boards, and most community builds in this library run on them — they are cheap, sip power and ship with the radios, screens and touch inputs a gadget needs. The library's ESP32 shelf is its biggest for exactly that reason.",
      zh: "Muse gadget 官方 SDK 就是围绕 ESP32 板子做的，案例库里的大多数构建也跑在它上面——便宜、省电，自带 gadget 需要的无线、屏幕和触控。这个分类是全站最大的，原因就在这。",
    },
  },
  {
    q: { en: "Which ESP32 variants show up in the builds?", zh: "案例里都出现了哪些 ESP32 型号？" },
    a: {
      en: "ESP32-S3 is the most common (pocket agents, wearables, SDK ports), followed by ESP32-C3 in compact wearables and ESP32-C6 in minimal no-PSRAM builds. Each build page lists its exact board and bill of materials.",
      zh: "ESP32-S3 最常见（口袋 Agent、可穿戴、SDK 移植），其次是小体积可穿戴里的 ESP32-C3，以及极简无 PSRAM 构建里的 ESP32-C6。每个案例页都有确切的板子型号和物料清单。",
    },
  },
  {
    q: { en: "I'm new — where should I start?", zh: "我是新手，从哪开始？" },
    a: {
      en: "Start with the beginner's build guide in this collection — a pocket AI agent for about $30 on a Waveshare ESP32-S3 board — then read the official SDK on GitHub before buying parts.",
      zh: "从这个合集里的新手保姆级教程开始——一块 Waveshare ESP32-S3 板子，约 30 美元的口袋 AI Agent。买零件之前，先读一遍 GitHub 上的官方 SDK。",
    },
  },
];

export default async function Esp32Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const cases = getCases().filter(isEsp32Build);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q[lang],
          acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
        })),
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
            name: lang === "zh" ? "Muse ESP32 项目" : "Muse ESP32 Projects",
            item: `${SITE_URL}/${lang}/devices/esp32`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-[1680px] px-3 pt-8 sm:px-6 sm:pt-10">
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link href={`/${lang}`} className="transition-colors hover:text-foreground">
            {t(lang, "catalogCrumb")}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-accent">
            {lang === "zh" ? "Muse ESP32 项目" : "Muse ESP32 Projects"}
          </span>
        </nav>
        <h1 className="mt-2 max-w-[16ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
          {lang === "zh" ? "Muse ESP32 项目" : "Muse ESP32 Projects"}
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {lang === "zh"
            ? `案例库目前收录 ${cases.length} 个用到 ESP32 系列开发板的社区构建——ESP32-S3、ESP32-C3、ESP32-C6，从口袋 AI Agent 到 SDK 移植都有。ESP32 是 Muse gadget 生态的主战场，这个页面会跟着新投稿一起长大。`
            : `The library currently lists ${cases.length} community builds using ESP32-series boards — ESP32-S3, ESP32-C3 and ESP32-C6, from pocket AI agents to SDK ports. ESP32 is the workhorse of the Muse gadget ecosystem, and this page grows with every new submission.`}
        </p>
      </div>

      <div className="mx-auto max-w-[1680px] px-3 py-8 sm:px-6">
        <p className="mb-4 text-sm text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground">{cases.length}</span>{" "}
          {t(lang, "buildsUnit")}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} lang={lang} />
          ))}
        </div>
      </div>

      <section className="mx-auto mt-4 max-w-3xl px-4 pb-12">
        <h2 className="mb-4 text-xl font-bold text-foreground">{t(lang, "faqTitle")}</h2>
        <Faq items={FAQ} lang={lang} />
      </section>
    </div>
  );
}
