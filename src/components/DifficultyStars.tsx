import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

export default function DifficultyStars({ value, lang }: { value: number; lang: Lang }) {
  return (
    <span
      role="img"
      aria-label={`${t(lang, "detailDifficulty")}: ${value}/5`}
      className="text-sm tracking-widest text-accent"
      title={`${t(lang, "detailDifficulty")}: ${value}/5`}
    >
      {"★".repeat(value)}
      <span className="text-border">{"★".repeat(5 - value)}</span>
    </span>
  );
}
