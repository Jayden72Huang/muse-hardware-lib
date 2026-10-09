import Link from "next/link";
import { CASES } from "@/content/cases";
import { SHELVES, type Lang, type Shelf, type SourceType } from "@/content/schema";
import { shelfName, t, typeName } from "@/i18n/dict";

// Desktop left sidebar for catalog subpages (categories / types).
// Mirrors the reference: All builds link, category tree with counts,
// type group, and an amber Sponsors panel with open slots.

const SHELVES_LIST = Object.keys(SHELVES) as Shelf[];
const TYPE_ROWS: SourceType[] = ["github", "social"];

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function SponsorsPanel({ lang }: { lang: Lang }) {
  return (
    <div className="rounded-2xl border border-sponsor-border bg-sponsor p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sponsor-foreground">
        {t(lang, "sponsorsTitle")}
      </p>
      <ol className="mt-3 space-y-2.5">
        {[1, 2, 3, 4].map((rank) => (
          <li key={rank} className="flex items-center gap-2.5">
            <span className="w-5 shrink-0 font-mono text-[11px] text-sponsor-foreground/70">
              #{rank}
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-dashed border-sponsor-border/80" aria-hidden />
            <span className="truncate text-sm text-sponsor-foreground/80">
              {t(lang, "openSlot")}
            </span>
          </li>
        ))}
      </ol>
      <Link
        href={`/${lang}/advertise`}
        className="mt-4 flex h-9 items-center justify-center gap-1 rounded-full bg-amber-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
      >
        {t(lang, "addYours")}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function Sidebar({
  lang,
  activeShelf,
  activeType,
}: {
  lang: Lang;
  activeShelf?: Shelf;
  activeType?: SourceType;
}) {
  const countShelf = (s: Shelf) => CASES.filter((c) => c.shelf === s).length;
  const countType = (ty: SourceType) => CASES.filter((c) => c.sourceType === ty).length;
  const rowCls = (active: boolean) =>
    `flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
      active
        ? "bg-muted font-medium text-foreground"
        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
    }`;

  return (
    <div className="sticky top-28 space-y-6 self-start">
      <nav aria-label="catalog">
        <Link href={`/${lang}`} className={rowCls(!activeShelf && !activeType)}>
          <span className="flex items-center gap-2">
            <GridIcon />
            {t(lang, "allBuilds")}
          </span>
          <span className="text-xs tabular-nums opacity-60">{CASES.length}</span>
        </Link>

        <p className="mb-1 mt-5 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
          {t(lang, "navCategories")}
        </p>
        <ul className="space-y-0.5">
          {SHELVES_LIST.map((s) => (
            <li key={s}>
              <Link href={`/${lang}/categories/${s}`} className={rowCls(activeShelf === s)} aria-current={activeShelf === s ? "page" : undefined}>
                <span className="truncate">{shelfName(s, lang)}</span>
                <span className="text-xs tabular-nums opacity-60">{countShelf(s)}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mb-1 mt-5 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
          {t(lang, "typesLabel")}
        </p>
        <ul className="space-y-0.5">
          {TYPE_ROWS.map((ty) => (
            <li key={ty}>
              <Link href={`/${lang}/type/${ty}`} className={rowCls(activeType === ty)} aria-current={activeType === ty ? "page" : undefined}>
                <span className="truncate">{typeName(ty, lang)}</span>
                <span className="text-xs tabular-nums opacity-60">{countType(ty)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <SponsorsPanel lang={lang} />
    </div>
  );
}
