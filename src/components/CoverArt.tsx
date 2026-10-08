// Designed cover art for cases without a real thumbnail (e.g. social posts
// whose platforms block scraping). Shelf-themed gradient + glyph, so the card
// looks intentional instead of empty.
import type { Shelf } from "@/content/schema";
import { shelfName } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

const THEME: Record<Shelf, { emoji: string; from: string; to: string; glow: string }> = {
  "smart-home": { emoji: "🏠", from: "#064e3b", to: "#022c22", glow: "rgba(52,211,153,.35)" },
  robots: { emoji: "🤖", from: "#7c2d12", to: "#431407", glow: "rgba(251,146,60,.35)" },
  wearable: { emoji: "⌚", from: "#4c1d95", to: "#2e1065", glow: "rgba(167,139,250,.35)" },
  "dev-boards": { emoji: "🔌", from: "#0c4a6e", to: "#082f49", glow: "rgba(56,189,248,.35)" },
  sensors: { emoji: "📡", from: "#134e4a", to: "#042f2e", glow: "rgba(45,212,191,.35)" },
  displays: { emoji: "🖥️", from: "#78350f", to: "#451a03", glow: "rgba(251,191,36,.35)" },
};

export default function CoverArt({
  shelf,
  number,
  lang,
}: {
  shelf: Shelf;
  number: string;
  lang: Lang;
}) {
  const t = THEME[shelf];
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
      aria-hidden
    >
      {/* dot grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <span
        className="relative text-6xl"
        style={{ filter: `drop-shadow(0 0 24px ${t.glow})` }}
      >
        {t.emoji}
      </span>
      <span className="absolute bottom-2.5 left-3 rounded bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white/80">
        {shelfName(shelf, lang)}
      </span>
      <span className="absolute bottom-2.5 right-3 font-mono text-[11px] text-white/50">
        №{number}
      </span>
    </div>
  );
}
