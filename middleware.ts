import { NextRequest, NextResponse } from "next/server";

const LANGS = ["en", "zh"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (LANGS.includes(first)) return NextResponse.next();
  // Root or unknown prefix -> pick lang from Accept-Language (zh first), else en
  const al = req.headers.get("accept-language") || "";
  const lang = /^zh/i.test(al) ? "zh" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt).*)"],
};
