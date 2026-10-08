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
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{t(lang, "newsletterTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t(lang, "newsletterSub")}</p>
        </>
      )}
      {state === "ok" ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
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
            className="w-full flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {state === "loading" ? t(lang, "subscribing") : t(lang, "subscribe")}
          </button>
        </form>
      )}
      {state === "invalid" && (
        <p className="mt-2 text-sm text-red-600">{t(lang, "subscribeInvalid")}</p>
      )}
      {state === "error" && (
        <p className="mt-2 text-sm text-red-600">{t(lang, "subscribeFail")}</p>
      )}
    </div>
  );
}
