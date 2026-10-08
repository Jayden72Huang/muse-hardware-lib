"use client";

import { useState } from "react";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";
const labelCls = "mb-1 block text-sm font-medium text-foreground";

export default function AdvertiseForm({
  lang,
  contactEmail,
}: {
  lang: Lang;
  contactEmail: string;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    if (contactEmail) {
      const subject = encodeURIComponent(`[Ad inquiry] ${name}`);
      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {t(lang, "formThanks")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="ad-name" className={labelCls}>
          {t(lang, "formName")}
        </label>
        <input id="ad-name" name="name" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="ad-email" className={labelCls}>
          {t(lang, "formEmail")}
        </label>
        <input id="ad-email" name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="ad-msg" className={labelCls}>
          {t(lang, "formMessage")}
        </label>
        <textarea id="ad-msg" name="message" rows={4} required className={inputCls} />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {t(lang, "formSend")}
      </button>
    </form>
  );
}
