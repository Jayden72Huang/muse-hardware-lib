import type { Metadata } from "next";
import { t } from "@/i18n/dict";
import { AD_TIERS, CONTACT_EMAIL, SITE_URL } from "@/content/config";
import type { Lang } from "@/content/schema";
import AdvertiseForm from "@/components/AdvertiseForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  return {
    title: `${t(lang, "advertiseTitle")} — ${t(lang, "siteName")}`,
    description: t(lang, "advertiseSub"),
    alternates: {
      canonical: `${SITE_URL}/${lang}/advertise`,
      languages: {
        en: `${SITE_URL}/en/advertise`,
        zh: `${SITE_URL}/zh/advertise`,
      },
    },
  };
}

export default async function AdvertisePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t(lang, "advertiseTitle")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
        {t(lang, "advertiseSub")}
      </p>

      <section className="mt-8 grid gap-5 sm:grid-cols-3">
        {AD_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
          >
            <h2 className="text-base font-bold text-zinc-100">
              {t(lang, `tier${tier.id[0].toUpperCase()}${tier.id.slice(1)}`)}
            </h2>
            <p className="mt-2 flex-1 text-sm text-zinc-400">
              {t(lang, `tier${tier.id[0].toUpperCase()}${tier.id.slice(1)}Desc`)}
            </p>
            <p className="mt-4">
              <span className="text-3xl font-extrabold text-orange-400">${tier.price}</span>
              <span className="text-sm text-zinc-500">
                {t(lang, tier.unit === "week" ? "perWeek" : "perIssue")}
              </span>
            </p>
          </div>
        ))}
      </section>
      <p className="mt-4 text-sm text-zinc-500">🤝 {t(lang, "negotiable")}</p>

      <section className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-xl font-bold">{t(lang, "advertiseContact")}</h2>
        <p className="mt-2 text-sm text-zinc-400">{t(lang, "advertiseContactDesc")}</p>
        <AdvertiseForm lang={lang} contactEmail={CONTACT_EMAIL} />
        {CONTACT_EMAIL ? (
          <p className="mt-4 text-sm text-zinc-500">
            {t(lang, "formOpenEmail")}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : (
          <p className="mt-4 rounded-lg border border-dashed border-zinc-700 p-3 text-sm text-zinc-500">
            {t(lang, "formOpenEmail")} <span className="font-mono">[contact email TBD]</span>
          </p>
        )}
        <p className="mt-3 text-xs text-zinc-600">💳 {t(lang, "stripeNote")}</p>
      </section>
    </div>
  );
}
