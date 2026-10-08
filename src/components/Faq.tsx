import type { LocalText, Lang } from "@/content/schema";

export default function Faq({ items, lang }: { items: { q: LocalText; a: LocalText }[]; lang: Lang }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="faq rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <summary className="text-sm font-semibold text-zinc-100">{f.q[lang]}</summary>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.a[lang]}</p>
        </details>
      ))}
    </div>
  );
}
