"use client";

import { useState } from "react";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

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
      <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
        {t(lang, "formThanks")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="ad-name" className="mb-1 block text-sm font-medium text-zinc-300">
          {t(lang, "formName")}
        </label>
        <input
          id="ad-name"
          name="name"
          required
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="ad-email" className="mb-1 block text-sm font-medium text-zinc-300">
          {t(lang, "formEmail")}
        </label>
        <input
          id="ad-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="ad-msg" className="mb-1 block text-sm font-medium text-zinc-300">
          {t(lang, "formMessage")}
        </label>
        <textarea
          id="ad-msg"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-orange-400"
      >
        {t(lang, "formSend")}
      </button>
    </form>
  );
}
