import type { MetaDescriptor } from "react-router";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  localePath,
  type Locale,
} from "./site-manifest";
import { ogImageUrl, siteOrigin } from "./site";

export interface PageSeo {
  locale: Locale;
  /** Localised path, e.g. `/zh/lumo`. */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

/**
 * Canonical URLs never carry a trailing slash: `drop-trailing-slash` in
 * `wrangler.toml` serves `/docs/lumo/mcp` from `docs/lumo/mcp/index.html` and redirects
 * the slash form away, so the canonical, the sitemap and every in-app link
 * describe exactly one URL.
 */
function withoutTrailingSlash(path: string): string {
  if (path === "/" || path === "") return "/";
  return path.replace(/\/+$/, "") || "/";
}

function absolute(path: string): string {
  const normalized = withoutTrailingSlash(path);
  return `${siteOrigin()}${normalized === "/" ? "" : normalized}`;
}

/**
 * Every route returns static metadata at build time. The canonical URL is the
 * localised path; `hreflang` lists every locale for the same document plus an
 * `x-default` pointing at the default locale, so search engines never have to
 * guess which language a URL belongs to.
 */
export function pageMeta({
  locale,
  path,
  title,
  description,
  type = "website",
  noIndex = false,
}: PageSeo): MetaDescriptor[] {
  const url = absolute(path);
  const other = locale === "en" ? "zh" : "en";
  const localeAlternates = LOCALES.map((entry) => ({
    tagName: "link" as const,
    rel: "alternate" as const,
    hrefLang: LOCALE_META[entry].htmlLang,
    href: absolute(localePath(entry, path)),
  }));

  return [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noIndex ? "noindex, follow" : "index, follow, max-image-preview:large",
    },
    { tagName: "link", rel: "canonical", href: url },
    ...localeAlternates,
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: absolute(localePath(DEFAULT_LOCALE, path)),
    },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "Lumo" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImageUrl() },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: LOCALE_META[locale].ogLocale },
    { property: "og:locale:alternate", content: LOCALE_META[other].ogLocale },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImageUrl() },
  ];
}

export function absoluteUrl(path: string): string {
  return absolute(path);
}
