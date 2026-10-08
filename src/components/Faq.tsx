import type { LocalText, Lang } from "@/content/schema";

export default function Faq({ items, lang }: { items: { q: LocalText; a: LocalText }[]; lang: Lang }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="faq rounded-[14px] border border-border bg-card px-5 py-4">
          <summary className="text-[15px] font-semibold text-foreground">{f.q[lang]}</summary>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a[lang]}</p>
        </details>
      ))}
    </div>
  );
}
