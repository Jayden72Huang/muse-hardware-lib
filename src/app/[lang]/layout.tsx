import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { figtree } from "@/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Lang } from "@/content/schema";
import { SITE_URL } from "@/content/config";

const LANGS: Lang[] = ["en", "zh"];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const path = `/${lang}`;
  return lang === "zh"
    ? {
        title: "Muse 硬件案例库 — 用 Muse 做出来的真实硬件",
        description:
          "收录社区用 Meta Muse 打造的硬件项目：ESP32、M5Stack、树莓派、墨水屏、智能家居、机器人。案例、教程、购买指南。",
        alternates: {
          canonical: `${SITE_URL}${path}`,
          languages: { en: `${SITE_URL}/en`, zh: `${SITE_URL}/zh` },
        },
      }
    : {
        title: "Muse Hardware Library — Real Hardware Built with Muse",
        description:
          "Community hardware projects built with Meta Muse: ESP32, M5Stack, Raspberry Pi, e-ink displays, smart home, robots. Cases, tutorials, buying guides.",
        alternates: {
          canonical: `${SITE_URL}${path}`,
          languages: { en: `${SITE_URL}/en`, zh: `${SITE_URL}/zh` },
        },
      };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  const l = lang as Lang;
  return (
    <html
      lang={l === "zh" ? "zh-CN" : "en"}
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Header lang={l} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={l} />
      </body>
    </html>
  );
}
