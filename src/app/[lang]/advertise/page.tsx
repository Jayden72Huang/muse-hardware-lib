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
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {t(lang, "advertiseTitle")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        {t(lang, "advertiseSub")}
      </p>

      <section className="mt-8 grid gap-5 sm:grid-cols-3">
        {AD_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-[14px] border border-border bg-card p-5${
              tier.available ? "" : " opacity-75"
            }`}
          >
            <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
              {t(lang, `tier${tier.id[0].toUpperCase()}${tier.id.slice(1)}`)}
              {!tier.available && (
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {t(lang, "tierComingSoon")}
                </span>
              )}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {t(lang, `tier${tier.id[0].toUpperCase()}${tier.id.slice(1)}Desc`)}
            </p>
            {tier.available ? (
              <p className="mt-4">
                <span className="text-3xl font-extrabold text-primary">${tier.price}</span>
                <span className="text-sm text-muted-foreground">
                  {t(lang, tier.unit === "week" ? "perWeek" : "perIssue")}
                </span>
              </p>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                {t(lang, "tierNewsletterPaused")}
              </p>
            )}
          </div>
        ))}
      </section>
      <p className="mt-4 text-sm text-muted-foreground">🤝 {t(lang, "negotiable")}</p>

      <section className="mt-10 rounded-[14px] border border-border bg-card p-6">
        <h2 className="text-xl font-bold text-foreground">{t(lang, "advertiseContact")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t(lang, "advertiseContactDesc")}</p>
        <AdvertiseForm lang={lang} contactEmail={CONTACT_EMAIL} />
        {CONTACT_EMAIL ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {t(lang, "formOpenEmail")}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground">
            {t(lang, "formOpenEmail")} <span className="font-mono">[contact email TBD]</span>
          </p>
        )}
        <p className="mt-3 text-xs text-muted-foreground/70">💳 {t(lang, "stripeNote")}</p>
      </section>
    </div>
  );
}
