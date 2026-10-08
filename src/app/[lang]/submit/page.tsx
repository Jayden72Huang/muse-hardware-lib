import type { Metadata } from "next";
import { SHELVES, SOURCE_TYPES, type Lang } from "@/content/schema";
import { shelfName, typeName, t } from "@/i18n/dict";
import { SITE_URL } from "@/content/config";
import SubmitForm from "@/components/SubmitForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  return {
    title: `${t(lang, "submitTitle")} — ${t(lang, "siteName")}`,
    description: t(lang, "submitSub"),
    alternates: {
      canonical: `${SITE_URL}/${lang}/submit`,
      languages: {
        en: `${SITE_URL}/en/submit`,
        zh: `${SITE_URL}/zh/submit`,
      },
    },
  };
}

const CheckIcon = () => (
  <span aria-hidden className="mr-2 font-bold text-accent">✓</span>
);

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {t(lang, "submitTitle")}
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">{t(lang, "submitSub")}</p>

      <section className="mt-8 rounded-[14px] border border-border bg-card p-5">
        <h2 className="text-lg font-bold text-foreground">{t(lang, "submitFields")}</h2>
        <ul className="mt-3 space-y-3 text-sm">
          <li>
            <span className="font-semibold text-foreground">{t(lang, "submitFieldLink")}</span>
            <p className="text-muted-foreground">{t(lang, "submitFieldLinkDesc")}</p>
          </li>
          <li>
            <span className="font-semibold text-foreground">{t(lang, "submitFieldDesc")}</span>
            <p className="text-muted-foreground">{t(lang, "submitFieldDescDesc")}</p>
          </li>
          <li>
            <span className="font-semibold text-foreground">{t(lang, "submitFieldType")}</span>
            <p className="text-muted-foreground">
              {t(lang, "submitFieldTypeDesc")}{" "}
              {(Object.keys(SOURCE_TYPES) as (keyof typeof SOURCE_TYPES)[]).map((k) => typeName(k, lang)).join(" / ")}
            </p>
          </li>
          <li>
            <span className="font-semibold text-foreground">{t(lang, "submitFieldShelf")}</span>
            <p className="text-muted-foreground">
              {t(lang, "submitFieldShelfDesc")}{" "}
              {(Object.keys(SHELVES) as (keyof typeof SHELVES)[]).map((k) => shelfName(k, lang)).join(" / ")}
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-6 rounded-[14px] border border-border bg-card p-5">
        <h2 className="text-lg font-bold text-foreground">{t(lang, "submitStandards")}</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex">
              <CheckIcon />
              <span>{t(lang, `submitStd${n}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-[14px] border border-border bg-card p-6">
        <SubmitForm lang={lang} />
      </section>
    </div>
  );
}
