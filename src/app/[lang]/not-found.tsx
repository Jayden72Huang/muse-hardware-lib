import Link from "next/link";

// Fully static: no params, no dict — the not-found boundary must render
// in every context, including dynamic fallbacks during production SSR.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-mono text-6xl font-bold text-border">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">This page doesn&apos;t exist · 这个页面不存在</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The link may be broken, or the build hasn&apos;t landed yet.
        <br />
        链接可能已失效，或者案例还在路上。
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link
          href="/en"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          ← All builds
        </Link>
        <Link
          href="/zh"
          className="rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          ← 全部案例
        </Link>
      </div>
    </div>
  );
}
