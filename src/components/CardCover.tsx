"use client";

import { useState } from "react";
import type { CaseStudy, Lang } from "@/content/schema";
import CoverArt from "./CoverArt";

// Card cover with graceful fallback: if the hotlinked thumbnail fails to
// load (rate limit, removed, etc.), swap to the designed shelf cover instead
// of showing a broken image.
export default function CardCover({ c, lang }: { c: CaseStudy; lang: Lang }) {
  const [failed, setFailed] = useState(false);
  if (!c.image || failed) {
    return <CoverArt shelf={c.shelf} number={c.number} lang={lang} />;
  }
  return (
    <img
      src={c.image}
      alt={c.title[lang]}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
}
