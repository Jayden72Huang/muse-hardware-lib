"use client";

import { useState } from "react";
import { SHELVES, SOURCE_TYPES, type Lang } from "@/content/schema";
import { shelfName, t, typeName } from "@/i18n/dict";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

type Status = "idle" | "sending" | "success" | "error";

export default function SubmitForm({ lang }: { lang: Lang }) {
  const [name, setName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [sourceType, setSourceType] = useState<string>("github");
  const [shelf, setShelf] = useState<string>("dev-boards");
  const [contactEmail, setContactEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState("submitFail");

  const inputCls =
    "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none";
  const labelCls = "mb-1 block text-sm font-medium text-zinc-300";
  const reqMark = <span className="text-orange-500"> *</span>;

  function clientError(): string | null {
    if (!name.trim() || !sourceUrl.trim() || !oneLiner.trim()) return "errRequired";
    if (!isHttpUrl(sourceUrl)) return "errBadUrl";
    if (oneLiner.trim().length > 200) return "errTooLong";
    if (contactEmail.trim() && !EMAIL_RE.test(contactEmail.trim())) return "errBadEmail";
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ce = clientError();
    if (ce) {
      setErrorKey(ce);
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          sourceUrl: sourceUrl.trim(),
          oneLiner: oneLiner.trim(),
          sourceType,
          shelf,
          contactEmail: contactEmail.trim(),
          lang,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorKey(data.error ?? "submitFail");
        setStatus("error");
      }
    } catch {
      setErrorKey("submitFail");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-8">
        <p className="text-lg font-bold text-emerald-300">{t(lang, "submitSuccessTitle")}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          {t(lang, "submitSuccessBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="sb-name" className={labelCls}>
          {t(lang, "submitProjectName")}
          {reqMark}
        </label>
        <input
          id="sb-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={120}
          required
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="sb-url" className={labelCls}>
          {t(lang, "submitSourceUrl")}
          {reqMark}
        </label>
        <input
          id="sb-url"
          type="url"
          inputMode="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://"
          required
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="sb-oneliner" className={labelCls}>
          {t(lang, "submitOneLiner")}
          {reqMark}
        </label>
        <textarea
          id="sb-oneliner"
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          rows={3}
          maxLength={250}
          required
          className={inputCls}
        />
        <p className="mt-1 text-right text-xs text-zinc-500">
          {oneLiner.trim().length} / 200
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sb-type" className={labelCls}>
            {t(lang, "submitSourceType")}
          </label>
          <select
            id="sb-type"
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className={inputCls}
          >
            {(Object.keys(SOURCE_TYPES) as (keyof typeof SOURCE_TYPES)[]).map((k) => (
              <option key={k} value={k}>
                {typeName(k, lang)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sb-shelf" className={labelCls}>
            {t(lang, "submitShelf")}
          </label>
          <select
            id="sb-shelf"
            value={shelf}
            onChange={(e) => setShelf(e.target.value)}
            className={inputCls}
          >
            {(Object.keys(SHELVES) as (keyof typeof SHELVES)[]).map((k) => (
              <option key={k} value={k}>
                {shelfName(k, lang)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="sb-email" className={labelCls}>
          {t(lang, "submitContactEmail")}
        </label>
        <input
          id="sb-email"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder={t(lang, "emailPlaceholder")}
          className={inputCls}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {t(lang, errorKey)}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-orange-400 disabled:opacity-60"
      >
        {status === "sending" ? t(lang, "submitSending") : t(lang, "submitSubmit")}
      </button>
    </form>
  );
}
