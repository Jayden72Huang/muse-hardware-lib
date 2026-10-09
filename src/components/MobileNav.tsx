"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

// Mobile navigation drawer (<lg only). Content is injected by the parent
// (the desktop <Sidebar/>), so both stay in sync. Overlay click, ESC and
// any in-drawer link close it; body scroll is locked while open.
export default function MobileNav({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const onContentClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        aria-label={t(lang, "openMenu")}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="drawer-overlay absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t(lang, "openMenu")}
            className="drawer-panel absolute left-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col border-r border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-[15px] font-semibold tracking-tight">
                <span className="text-foreground">muse</span>
                <span className="text-primary">hardware</span>
              </span>
              <button
                ref={closeRef}
                type="button"
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={t(lang, "closeMenu")}
                onClick={() => setOpen(false)}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4" onClick={onContentClick}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
