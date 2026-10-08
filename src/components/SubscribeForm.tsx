"use client";

import { useState } from "react";
import { t } from "@/i18n/dict";
import type { Lang } from "@/content/schema";

export default function SubscribeForm({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), lang }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      {!compact && (
        <>
          <h2 className="text-2xl font-bold tracking-tight">{t(lang, "newsletterTitle")}</h2>
          <p className="mt-2 text-sm text-zinc-400">{t(lang, "newsletterSub")}</p>
        </>
      )}
      {state === "ok" ? (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {t(lang, "subscribeOk")}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor={compact ? "nl-email-footer" : "nl-email"} className="sr-only">
            Email
          </label>
          <input
            id={compact ? "nl-email-footer" : "nl-email"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t(lang, "emailPlaceholder")}
            className="w-full flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-orange-400 disabled:opacity-60"
          >
            {state === "loading" ? t(lang, "subscribing") : t(lang, "subscribe")}
          </button>
        </form>
      )}
      {state === "invalid" && (
        <p className="mt-2 text-sm text-red-400">{t(lang, "subscribeInvalid")}</p>
      )}
      {state === "error" && (
        <p className="mt-2 text-sm text-red-400">{t(lang, "subscribeFail")}</p>
      )}
    </div>
  );
}
