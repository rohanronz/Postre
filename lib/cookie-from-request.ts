/**
 * Parse the raw Cookie header from a request.
 * Use as fallback when request.cookies / next/headers cookies() are empty (e.g. on Vercel serverless).
 */
export function getCookieMapFromRequest(request: Request): Map<string, string> {
  const cookieHeader = request.headers.get("cookie");
  const map = new Map<string, string>();
  if (!cookieHeader) return map;
  for (const part of cookieHeader.split("; ")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (name) map.set(name, value);
  }
  return map;
}
