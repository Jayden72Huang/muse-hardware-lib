// Server-side Resend helper. Requires RESEND_API_KEY in the environment
// (Vercel: Settings → Environment Variables). Never commit the key.
// NOTE: api.resend.com sits behind Cloudflare — a real User-Agent header is
// mandatory, otherwise requests fail with error 1010.

const API = "https://api.resend.com";

function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "muse-hardware-lib/1.0",
  };
}

export function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function resendPost(
  path: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const resp = await fetch(`${API}${path}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  let data: unknown = null;
  try {
    data = await resp.json();
  } catch {
    // non-JSON response; keep data null
  }
  return { ok: resp.ok, status: resp.status, data };
}
