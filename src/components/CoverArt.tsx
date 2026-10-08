// Designed cover art for cases without a real thumbnail (e.g. social posts
// whose platforms block scraping). Light shelf-themed gradient + glyph, so the
// card looks intentional instead of empty.
import type { Shelf } from "@/content/schema";
import { shelfName } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

const THEME: Record<Shelf, { emoji: string; from: string; to: string }> = {
  "smart-home": { emoji: "🏠", from: "#ecfdf5", to: "#d1fae5" },
  robots: { emoji: "🤖", from: "#fff7ed", to: "#ffedd5" },
  wearable: { emoji: "⌚", from: "#f5f3ff", to: "#ede9fe" },
  "dev-boards": { emoji: "🔌", from: "#f0f9ff", to: "#e0f2fe" },
  sensors: { emoji: "📡", from: "#f0fdfa", to: "#ccfbf1" },
  displays: { emoji: "🖥️", from: "#fffbeb", to: "#fef3c7" },
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
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(17,17,18,.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <span className="relative text-6xl drop-shadow-sm">{t.emoji}</span>
      <span className="absolute bottom-2.5 left-3 rounded-md bg-white/80 px-2 py-0.5 text-[11px] font-medium text-foreground/80 backdrop-blur-sm">
        {shelfName(shelf, lang)}
      </span>
      <span className="absolute bottom-2.5 right-3 font-mono text-[11px] text-foreground/50">
        №{number}
      </span>
    </div>
  );
}
