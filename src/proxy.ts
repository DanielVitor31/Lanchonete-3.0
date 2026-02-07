import { NextRequest, NextResponse } from "next/server";

const ACTION_ID_REGEX = /^[a-f0-9]{42}$/i;
const LOG_WINDOW_MS = 30_000;
const globalCache = globalThis as unknown as {
  __proxyLogCache?: Map<string, number>;
};
const logCache = (globalCache.__proxyLogCache ??= new Map<string, number>());

function shouldLog(key: string, now: number) {
  const last = logCache.get(key) ?? 0;
  if (now - last > LOG_WINDOW_MS) {
    logCache.set(key, now);
    return true;
  }
  return false;
}

function isPrivateIp(ip: string) {
  // handles IPv4 and IPv4-mapped IPv6 (::ffff:1.2.3.4)
  const ipv4 = ip.replace("::ffff:", "");
  return (
    ipv4.startsWith("127.") ||
    ipv4.startsWith("10.") ||
    ipv4.startsWith("192.168.") ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ipv4) ||
    ip === "::1" ||
    ip === "0:0:0:0:0:0:0:1"
  );
}

export function proxy(req: NextRequest) {
  if (req.method === "POST") {
    const actionId = req.headers.get("next-action");

    if (actionId && !ACTION_ID_REGEX.test(actionId)) {
      const userAgent = req.headers.get("user-agent") ?? "unknown";
      const origin = req.headers.get("origin") ?? "unknown";
      const referer = req.headers.get("referer") ?? "unknown";
      const forwardedFor = req.headers.get("x-forwarded-for") ?? "unknown";
      const ip = (req.ip ?? forwardedFor).toString();

      // Drop early any POST from outside LAN/localhost to avoid spam noise
      if (!isPrivateIp(ip)) {
        if (process.env.NODE_ENV !== "production" && shouldLog("remote-" + ip, Date.now())) {
          console.warn(`[proxy] dropped remote POST from ip="${ip}" ua="${userAgent}" referer="${referer}"`);
        }
        return new NextResponse(null, { status: 204 });
      }

      const key = `${actionId}|${req.nextUrl.pathname}|${origin}|${userAgent}|${referer}|${ip}`;

      if (process.env.NODE_ENV !== "production" && shouldLog(key, Date.now())) {
        console.warn(
          `[proxy] blocked invalid next-action="${actionId}" path="${req.nextUrl.pathname}" origin="${origin}" referer="${referer}" ip="${ip}" ua="${userAgent}"`
        );
      }

      return new NextResponse(null, { status: 204 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
