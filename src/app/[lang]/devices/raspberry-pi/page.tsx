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

/** Builds whose hardware/bom/title/description mention Raspberry Pi (case-insensitive). */
function isRaspberryPiBuild(c: CaseStudy): boolean {
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
  return hay.includes("raspberry");
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Muse Raspberry Pi Projects — Real Community Builds",
    description:
      "Real muse raspberry pi projects from the community: always-on servers, media-stack bridges and Home Assistant add-ons running Muse on Raspberry Pi.",
  },
  zh: {
    title: "Muse 树莓派项目 — 社区真实案例",
    description:
      "社区真实的 Muse 树莓派项目：在树莓派上跑 Muse 的常驻服务、媒体库桥接与 Home Assistant 插件。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const path = `/${lang}/devices/raspberry-pi`;
  return {
    title: META[lang].title,
    description: META[lang].description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/devices/raspberry-pi`,
        zh: `${SITE_URL}/zh/devices/raspberry-pi`,
      },
    },
  };
}

const FAQ: { q: { en: string; zh: string }; a: { en: string; zh: string } }[] = [
  {
    q: { en: "What do people use Raspberry Pi for with Muse?", zh: "大家拿树莓派配 Muse 做什么？" },
    a: {
      en: "The server side of the gadget world. Community builds run Muse on a Pi as an always-on Home Assistant bridge or a media-stack companion that talks to Sonarr, Radarr and Jellyfin — jobs where a plugged-in Linux box beats a battery-powered microcontroller.",
      zh: "gadget 世界的服务端。社区构建把 Muse 跑在树莓派上，做常驻的 Home Assistant 桥接，或者对接 Sonarr、Radarr、Jellyfin 的媒体库伴侣——这些活儿插着电的 Linux 主机比电池供电的单片机更合适。",
    },
  },
  {
    q: { en: "Why are there so few Raspberry Pi builds?", zh: "为什么树莓派案例这么少？" },
    a: {
      en: "The gadget story started on ESP32, and this library is only a few weeks old — the Pi shelf is a small but growing collection. If you've built something on a Pi, submit it and this page gets longer.",
      zh: "gadget 的故事是从 ESP32 开始的，而且这个案例库才上线几周——树莓派合集还小，但会长大。如果你做过树莓派上的构建，投个稿，这个页面就多一行。",
    },
  },
  {
    q: { en: "Can I run a Muse build on the Pi I already own?", zh: "我手头的树莓派能直接跑吗？" },
    a: {
      en: "Likely yes for server-side builds: the media-stack companion in this collection runs on any always-on Linux host and explicitly lists Raspberry Pi as working. Check the build's bill of materials before you start.",
      zh: "服务端构建大概率可以：这个合集里的媒体库伴侣跑在任意常开的 Linux 主机上，物料清单里明确写了树莓派可用。动手前先看构建页的物料清单。",
    },
  },
];

export default async function RaspberryPiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const cases = getCases().filter(isRaspberryPiBuild);

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
            name: lang === "zh" ? "Muse 树莓派项目" : "Muse Raspberry Pi Projects",
            item: `${SITE_URL}/${lang}/devices/raspberry-pi`,
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
            {lang === "zh" ? "Muse 树莓派项目" : "Muse Raspberry Pi Projects"}
          </span>
        </nav>
        <h1 className="mt-2 max-w-[16ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
          {lang === "zh" ? "Muse 树莓派项目" : "Muse Raspberry Pi Projects"}
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {lang === "zh"
            ? `一个还在长大的小合集：案例库目前收录 ${cases.length} 个用到树莓派的社区构建。树莓派负责 gadget 生态的服务端一侧——常驻服务、媒体库、智能家居桥接。想看单片机一侧，去开发板实战分类逛逛。`
            : `A small but growing collection: the library currently lists ${cases.length} community build${cases.length === 1 ? "" : "s"} using Raspberry Pi. The Pi covers the server side of the gadget ecosystem — always-on services, media libraries, smart-home bridges. For the microcontroller side, browse the dev-boards shelf.`}
        </p>
        <p className="mt-3 text-sm">
          <Link
            href={`/${lang}/categories/dev-boards`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {lang === "zh" ? "→ 开发板实战分类" : "→ Dev Boards in Action shelf"}
          </Link>
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
