import Link from "next/link";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

export default function SponsoredCard({ lang }: { lang: Lang }) {
  return (
    <Link
      href={`/${lang}/advertise`}
      className="case-card flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-orange-500/50 bg-orange-500/5 p-6 text-center"
      aria-label={t(lang, "yourAdHere")}
    >
      <span className="rounded-full border border-orange-500/40 px-2.5 py-0.5 text-xs font-medium text-orange-400">
        {t(lang, "sponsored")}
      </span>
      <span className="text-lg font-semibold text-zinc-200">{t(lang, "yourAdHere")}</span>
      <span className="text-sm text-zinc-500">{t(lang, "yourAdSub")}</span>
    </Link>
  );
}
