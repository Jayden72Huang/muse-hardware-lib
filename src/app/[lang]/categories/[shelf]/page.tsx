import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCases } from "@/content/cases";
import { SHELVES, type Lang, type Shelf } from "@/content/schema";
import { SHELF_FAQ, shelfName, t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import CaseCard from "@/components/CaseCard";
import Faq from "@/components/Faq";
import FilterBar from "@/components/FilterBar";

const SHELVES_LIST = Object.keys(SHELVES) as Shelf[];

export async function generateStaticParams() {
  const params: { lang: string; shelf: string }[] = [];
  for (const lang of ["en", "zh"])
    for (const shelf of SHELVES_LIST) params.push({ lang, shelf });
  return params;
}

const EDITOR_NOTES: Record<Shelf, { en: string; zh: string }> = {
  "smart-home": {
    en: "Muse is moving into the living room. These builds connect Meta's assistant to Home Assistant and real devices — lights, media servers and sensors you can talk to. If you want one Muse brain for the whole house, start here.",
    zh: "Muse 正在走进客厅。这里的案例把 Meta 助手接到 Home Assistant 和真实设备上 —— 灯、媒体服务器、可以对话的传感器。想让一个 Muse 大脑管全屋，从这里开始。",
  },
  robots: {
    en: "Desktop companions with servos and personality. From the beloved StackChan platform to custom servo choreography, these builds give Muse a body, a face and a desk to live on.",
    zh: "有舵机、有性格的桌面伙伴。从深受喜爱的 StackChan 平台到自定义舵机编排，这些案例给了 Muse 一具身体、一张脸和一张桌子。",
  },
  wearable: {
    en: "Muse you can carry. E-ink companions that snap to your phone, DIY charms and pocket builds — always with you, sipping battery instead of gulping it.",
    zh: "可以随身带的 Muse。贴在手机背面的墨水屏伴侣、DIY 挂件、口袋里的构建 —— 永远在你身边，省电而不是耗电。",
  },
  "dev-boards": {
    en: "The workbench shelf. ESP32-S3, M5Stack, Raspberry Pi — flashing firmware, wiring peripherals and porting the gadget SDK to new boards. The fastest way to get Muse running on bare metal.",
    zh: "工作台专区。ESP32-S3、M5Stack、树莓派 —— 烧固件、接外设、把 gadget SDK 移植到新板子。让 Muse 跑在裸机上最快的一条路。",
  },
  sensors: {
    en: "Give Muse senses. Temperature, motion, air quality — these builds wire sensors into the gadget SDK so Muse can answer questions about the physical world around it.",
    zh: "给 Muse 装上感官。温度、人体感应、空气质量 —— 这些案例把传感器接入 gadget SDK，让 Muse 能回答关于物理世界的问题。",
  },
  displays: {
    en: "Glanceable Muse. E-ink status screens, AMOLED faces and morning-briefing displays — the right screen for an assistant that lives on your desk, not in your pocket.",
    zh: "扫一眼就能看的 Muse。墨水屏状态屏、AMOLED 表情、晨间简报机 —— 给住在桌上而不是口袋里的助手，配一块合适的屏幕。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; shelf: string }>;
}): Promise<Metadata> {
  const { lang, shelf } = (await params) as { lang: Lang; shelf: Shelf };
  if (!SHELVES[shelf]) return {};
  const path = `/${lang}/categories/${shelf}`;
  return {
    title: `${shelfName(shelf, lang)} — ${t(lang, "siteName")}`,
    description: EDITOR_NOTES[shelf][lang],
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: `${SITE_URL}/en/categories/${shelf}`,
        zh: `${SITE_URL}/zh/categories/${shelf}`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; shelf: string }>;
}) {
  const { lang, shelf } = (await params) as { lang: Lang; shelf: Shelf };
  if (!SHELVES[shelf]) notFound();
  const cases = getCases().filter((c) => c.shelf === shelf);
  const faq = SHELF_FAQ[shelf];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
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
            name: shelfName(shelf, lang),
            item: `${SITE_URL}/${lang}/categories/${shelf}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <FilterBar lang={lang} active={shelf} />
      <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {t(lang, "navCategories")}
      </p>
      <h1 className="mt-2 text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
        {shelfName(shelf, lang)}
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
        {EDITOR_NOTES[shelf][lang]}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cases.map((c) => (
          <CaseCard key={c.slug} c={c} lang={lang} />
        ))}
      </div>
      {cases.length === 0 && (
        <p className="mt-4 rounded-[14px] border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          {t(lang, "emptyCategory")}
        </p>
      )}

      <section className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">{t(lang, "faqTitle")}</h2>
        <Faq items={faq} lang={lang} />
      </section>
      </div>
    </div>
  );
}
