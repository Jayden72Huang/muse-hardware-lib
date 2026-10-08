import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

export default function DifficultyStars({ value, lang }: { value: number; lang: Lang }) {
  return (
    <span
      role="img"
      aria-label={`${t(lang, "detailDifficulty")}: ${value}/5`}
      className="text-orange-400 tracking-widest"
    >
      {"★".repeat(value)}
      <span className="text-zinc-700">{"★".repeat(5 - value)}</span>
    </span>
  );
}
