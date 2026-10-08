import Link from "next/link";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

export default function SponsoredCard({ lang }: { lang: Lang }) {
  return (
    <Link
      href={`/${lang}/advertise`}
      className="case-card flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-sponsor-border bg-sponsor p-6 text-center"
      aria-label={t(lang, "yourAdHere")}
    >
      <span className="rounded-full border border-sponsor-border bg-white/60 px-2.5 py-0.5 text-xs font-medium text-sponsor-foreground">
        {t(lang, "sponsored")}
      </span>
      <span className="text-lg font-semibold text-foreground">{t(lang, "yourAdHere")}</span>
      <span className="text-sm text-sponsor-foreground">{t(lang, "yourAdSub")}</span>
    </Link>
  );
}
