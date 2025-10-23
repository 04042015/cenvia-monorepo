import { NextResponse } from "next/server";

export function middleware(req) {
  const userAgent = req.headers.get("user-agent") || "";
  const url = req.nextUrl;

  // Daftar bot/crawler yang boleh di-prerender
  const isBot = /(googlebot|bingbot|yandex|baidu|duckduckbot|slurp|facebookexternalhit|twitterbot)/i.test(userAgent);

  if (isBot) {
    const prerenderUrl = `https://service.prerender.io/${url.href}`;
    return NextResponse.rewrite(prerenderUrl, {
      headers: {
        "X-Prerender-Token": "1oXfJ0LpK7I2SuohmnHq",
      },
    });
  }

  // Pengunjung biasa → tampilkan situs normal
  return NextResponse.next();
}
