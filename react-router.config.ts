import type { Config } from "@react-router/dev/config";
import { DOC_SLUGS, LOCALES } from "./app/lib/site-manifest";

const docPaths = LOCALES.flatMap((locale) =>
  DOC_SLUGS.map((slug) =>
    locale === "en" ? `/docs/${slug}` : `/${locale}/docs/${slug}`,
  ),
);

/**
 * Static-first delivery for Cloudflare Pages.
 *
 * Runtime SSR is disabled; every route is pre-rendered at build time into
 * `build/client`. Client-side navigation still uses React Router's data
 * fetching, so the site behaves like an SPA after the first paint while
 * crawlers get complete HTML per URL.
 */
export default {
  ssr: false,
  prerender: async ({ getStaticPaths }) => {
    const staticPaths = getStaticPaths();
    return Array.from(new Set([...staticPaths, ...docPaths]));
  },
} satisfies Config;
