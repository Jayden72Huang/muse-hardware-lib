"use client";

import { useState } from "react";

// Official-resource preview card for the homepage hero.
// Real thumbnail hotlink; falls back to a theme-tinted placeholder with the
// domain name if the image can't load — never a fake image.
export default function OfficialCard({
  href,
  image,
  title,
  desc,
  domain,
}: {
  href: string;
  image: string;
  title: string;
  desc: string;
  domain: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:shadow-sm"
    >
      <span className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
        {failed ? (
          <span className="flex h-full w-full items-center justify-center bg-primary/10 px-1 text-center font-mono text-[10px] leading-tight text-primary">
            {domain}
          </span>
        ) : (
          <img
            src={image}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </span>
      <span className="block min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
          {title}
        </span>
        <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
          {desc}
        </span>
        <span className="mt-1.5 block font-mono text-[10px] text-muted-foreground/70">
          {domain} <span aria-hidden>↗</span>
        </span>
      </span>
    </a>
  );
}
