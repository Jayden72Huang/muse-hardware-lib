import type { Metadata } from "next";
import Link from "next/link";
import { getCases } from "@/content/cases";
import type { Lang, Shelf } from "@/content/schema";
import { t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import CaseCard from "@/components/CaseCard";
import Faq from "@/components/Faq";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "What Can You Build with Muse Gadgets? Ideas & Real Projects",
    description:
      "Wondering what you can build with Muse gadgets? Browse muse gadget projects and real examples from the community: robots, wearables, ESP32 builds, smart-home bridges and displays.",
  },
  zh: {
    title: "用 Muse 能做什么硬件？真实项目案例与入门指南",
    description:
      "想知道用 Muse 能做什么硬件？这里收录 Muse 硬件项目的真实案例：桌面机器人、随身设备、ESP32 开发板、智能家居、墨水屏，一看就知道从哪下手。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const path = `/${lang}/guide`;
  return {
    title: META[lang].title,
    description: META[lang].description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/guide`,
        zh: `${SITE_URL}/zh/guide`,
      },
    },
  };
}

type GuideSection = {
  shelf: Shelf;
  heading: { en: string; zh: string };
  body: { en: string; zh: string };
  caseSlug?: string;
};

const SECTIONS: GuideSection[] = [
  {
    shelf: "smart-home",
    heading: { en: "Give your house a voice", zh: "给房子装上嘴" },
    body: {
      en: "The most practical corner of the library. Builders wire Muse into Home Assistant so one assistant can hear the whole house — transcribing voice, calling services, checking energy use and sending notifications. If you already run a smart home, this is the shortest path from a gadget on your desk to a gadget that runs the house.",
      zh: "案例库里最实用的一块。创客们把 Muse 接进 Home Assistant，让一个助手听见整个家——转写语音、调用服务、查能耗、发通知。如果你家里已经有智能家居，这是从桌上小玩意到管家级设备的最短路径。",
    },
    caseSlug: "ha-muse-stt",
  },
  {
    shelf: "robots",
    heading: { en: "Put Muse on legs (or wheels)", zh: "给 Muse 一具身体" },
    body: {
      en: "Desktop companions with servos and attitude. From the beloved StackChan platform to custom builds, these projects give the assistant a body, a face and a place on your desk. The robot shelf is where personality engineering happens — voices, expressions, little dances.",
      zh: "有舵机、有性格的桌面伙伴。从深受喜爱的 StackChan 平台到完全自制的机器人，这些项目给了助手一具身体、一张脸和桌上的一席之地。机器人分类是「人格工程」发生的地方——声音、表情、小舞蹈。",
    },
    caseSlug: "musechan",
  },
  {
    shelf: "wearable",
    heading: { en: "Carry Muse in your pocket", zh: "把 Muse 揣进口袋" },
    body: {
      en: "Small, low-power, always with you. E-ink companions that sip battery, DIY charms and tamagotchi-style builds that turn the assistant into something you look after. The wearable shelf is the friendliest place to start: the hardware is cheap and the builds are charming.",
      zh: "小、省电、随身带。省电的墨水屏伴侣、DIY 挂件、电子宠物式的构建，把助手变成一个需要你照顾的小东西。可穿戴分类是最友好的起点：硬件便宜，成品可爱。",
    },
    caseSlug: "muse-tamagotchi-erik-taveras",
  },
  {
    shelf: "dev-boards",
    heading: { en: "Hack on bare metal", zh: "在裸机上折腾" },
    body: {
      en: "The workbench shelf. ESP32-S3, ESP32-C6, M5Stack — flashing firmware, porting the gadget SDK to new boards, even resurrecting old hardware like the Rabbit r1 or a Sony PSP as Muse gadgets. If you like soldering and serial consoles, start here.",
      zh: "工作台专区。ESP32-S3、ESP32-C6、M5Stack——烧固件、把 gadget SDK 移植到新板子，甚至把 Rabbit r1、索尼 PSP 这样的老硬件复活成 Muse gadget。喜欢焊台和串口终端的人，从这里开始。",
    },
    caseSlug: "esp32-muse-agent",
  },
  {
    shelf: "sensors",
    heading: { en: "Give Muse senses", zh: "给 Muse 装上感官" },
    body: {
      en: "Temperature, motion, air quality — the frontier shelf. No community builds have been submitted here yet, which means the first sensor gadgets to land in the library will define what this category becomes. The official docs already cover the building blocks.",
      zh: "温度、人体感应、空气质量——这是片处女地。这个分类还没有社区投稿，意味着第一批传感器 gadget 将定义它长什么样。官方文档里已经有现成的积木。",
    },
  },
  {
    shelf: "displays",
    heading: { en: "A screen that glances back", zh: "一块会回望你的屏幕" },
    body: {
      en: "Glanceable Muse for the desk. E-ink status screens that update once a minute, morning-briefing displays, AMOLED faces. These builds treat the screen as the whole product — the right information, at the right size, always on.",
      zh: "放在桌上扫一眼就能看的 Muse。一分钟刷新一次的墨水屏状态屏、晨间简报机、AMOLED 表情。这些构建把屏幕本身当成产品——合适的信息、合适的尺寸、永远在线。",
    },
    caseSlug: "muse-pocket",
  },
];

const GUIDE_FAQ: { q: { en: string; zh: string }; a: { en: string; zh: string } }[] = [
  {
    q: { en: "What is a Muse gadget?", zh: "什么是 Muse gadget？" },
    a: {
      en: "Muse gadgets are open-source hardware devices for Meta's Muse assistant. You program an off-the-shelf ESP32 board or set up a Raspberry Pi with the official SDKs, then connect Muse to displays, buttons, sensors and actuators. Start at the official site (gadgets.muse.ai) and the open-source SDK on GitHub (github.com/facebookincubator/muse-gadget-sdk).",
      zh: "Muse gadget 是给 Meta Muse 助手用的开源硬件。你可以用现成的 ESP32 开发板烧录官方 SDK，或者在树莓派上配置，然后把 Muse 接到屏幕、按钮、传感器和执行器上。先看官网（gadgets.muse.ai）和 GitHub 上的开源 SDK（github.com/facebookincubator/muse-gadget-sdk）。",
    },
  },
  {
    q: { en: "What kinds of things have people built?", zh: "大家都用它做了什么？" },
    a: {
      en: "The library groups community builds into six shelves: smart-home bridges, desktop robots, wearables, dev-board hacks, sensor builds and displays. Highlights include a Muse Tamagotchi on ESP32-S3, a Home Assistant voice engine, a StackChan robot and a $30 pocket AI agent.",
      zh: "案例库把社区构建分成六大类：智能家居桥接、桌面机器人、可穿戴、开发板实战、传感器和显示。代表作有一只跑在 ESP32-S3 上的 Muse 电子宠物、Home Assistant 语音引擎、StackChan 机器人，还有 30 美元的口袋 AI Agent。",
    },
  },
  {
    q: { en: "What hardware do I need to start?", zh: "入门需要什么硬件？" },
    a: {
      en: "Boards that actually appear in the library's builds: ESP32-S3 and ESP32-C3 modules, M5Stack devices (CoreS3, Core2, StackChan), and Raspberry Pi for always-on server-side builds. Most community builds use inexpensive off-the-shelf boards — check any build's bill of materials for exact parts.",
      zh: "案例库里真实出现过的板子：ESP32-S3、ESP32-C3 模组，M5Stack 系列（CoreS3、Core2、StackChan），以及用来跑常驻服务的树莓派。多数社区构建用的都是便宜的现货板子，具体零件看每个案例的物料清单。",
    },
  },
  {
    q: { en: "Do I need to write code?", zh: "需要会写代码吗？" },
    a: {
      en: "Honestly: most builds involve flashing firmware or editing configuration, and the difficulty varies a lot. Every build in the library links its public source and is tagged with a difficulty rating — start with a 1-star build and read its source before buying parts.",
      zh: "实话实说：多数构建涉及烧录固件或改配置，难度差别很大。案例库里的每个构建都链了公开源地址并标了难度星级——先从一星项目看起，读完源地址再买零件。",
    },
  },
  {
    q: {
      en: "Where is the official documentation?",
      zh: "官方文档在哪里？",
    },
    a: {
      en: "Meta publishes the project at gadgets.muse.ai and the open-source SDK at github.com/facebookincubator/muse-gadget-sdk. This library is a community project and is not affiliated with Meta — it collects what the community builds with those official tools.",
      zh: "Meta 在 gadgets.muse.ai 发布项目，SDK 开源在 github.com/facebookincubator/muse-gadget-sdk。本站是社区项目，与 Meta 没有关联——我们收录的是社区用这些官方工具做出来的东西。",
    },
  },
  {
    q: { en: "How do I share my own build?", zh: "怎么分享我自己的作品？" },
    a: {
      en: "Submit it through the site's submit page — every submission needs a public source link (GitHub repo, video or article) so others can verify and learn from it.",
      zh: "通过本站的投稿页面提交——每个投稿都需要一个公开的源链接（GitHub 仓库、视频或文章），让别人能验证、能学到东西。",
    },
  },
];

export default async function GuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const cases = getCases();
  const bySlug = new Map(cases.map((c) => [c.slug, c]));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: GUIDE_FAQ.map((f) => ({
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
            name: lang === "zh" ? "指南" : "Guide",
            item: `${SITE_URL}/${lang}/guide`,
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

      {/* breadcrumb → H1 → description */}
      <div className="mx-auto max-w-[1680px] px-3 pt-8 sm:px-6 sm:pt-10">
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link href={`/${lang}`} className="transition-colors hover:text-foreground">
            {t(lang, "catalogCrumb")}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-accent">{lang === "zh" ? "指南" : "Guide"}</span>
        </nav>
        <h1 className="mt-2 max-w-[20ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
          {lang === "zh"
            ? "用 Muse 能做什么硬件？"
            : "What can you build with Muse gadgets?"}
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {lang === "zh"
            ? "这是一份灵感指南：社区已经用 Muse 的开源硬件做出了哪些东西，按六大类整理，每类附一个真实案例。看完你就知道该从哪块板子下手。"
            : "An idea guide from a community case library: what people have already built with Muse's open-source hardware, organized into six shelves with one real build each. Read it and you'll know which board to start with."}
        </p>
      </div>

      {/* six shelves */}
      <div className="mx-auto max-w-[1680px] px-3 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {SECTIONS.map((s) => {
            const example = s.caseSlug ? bySlug.get(s.caseSlug) : undefined;
            return (
              <section key={s.shelf} className="rounded-[14px] border border-border bg-card p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-xl font-bold text-foreground">{s.heading[lang]}</h2>
                  <Link
                    href={`/${lang}/categories/${s.shelf}`}
                    className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {lang === "zh" ? "看全部分类 →" : "Browse shelf →"}
                  </Link>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {s.body[lang]}
                </p>
                {example && (
                  <div className="mt-5">
                    <CaseCard c={example} lang={lang} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <section className="mx-auto mt-4 max-w-3xl px-4 pb-12">
        <h2 className="mb-4 text-xl font-bold text-foreground">{t(lang, "faqTitle")}</h2>
        <Faq items={GUIDE_FAQ} lang={lang} />
      </section>
    </div>
  );
}
