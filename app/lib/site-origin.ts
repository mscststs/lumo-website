/**
 * Origin handling for an origin-agnostic deployment.
 *
 * Absolute URLs (canonical, hreflang, Open Graph, JSON-LD, sitemap) need an
 * origin at build time, but this site must work on any domain — `*.workers.dev`,
 * a custom domain, a preview URL — without build-time configuration. The build
 * therefore stamps `SITE_ORIGIN_PLACEHOLDER`, and the Worker in `src/worker.ts`
 * swaps every occurrence for the origin of the incoming request.
 *
 * Keep this module free of Vite and React imports: it is bundled into both the
 * app and the Worker.
 */
export const SITE_ORIGIN_PLACEHOLDER = "https://site.invalid";

/** Text responses whose absolute URLs depend on the request origin. */
const REWRITABLE_CONTENT_TYPES = [
  "text/html",
  "application/xml",
  "text/xml",
  "text/plain",
];

export function isRewritableContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  const value = contentType.toLowerCase();
  return REWRITABLE_CONTENT_TYPES.some((type) => value.includes(type));
}

export function rewriteOrigin(body: string, origin: string): string {
  if (!origin || !body.includes(SITE_ORIGIN_PLACEHOLDER)) return body;
  return body.split(SITE_ORIGIN_PLACEHOLDER).join(origin);
}

/** Normalises a configured site URL, falling back to the placeholder. */
export function resolveSiteOrigin(configured?: string): string {
  const trimmed = configured?.trim();
  return (trimmed && trimmed.length > 0 ? trimmed : SITE_ORIGIN_PLACEHOLDER).replace(
    /\/$/,
    "",
  );
}
