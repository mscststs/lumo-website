import type { MetaDescriptor } from "react-router";
import { LOCALE_META, switchLocalePath, type Locale } from "./site-manifest";
import { OG_IMAGE, SITE_URL } from "./site";

export interface PageSeo {
  locale: Locale;
  /** Localised path, e.g. `/zh/lumo`. */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

function withTrailingSlash(path: string): string {
  if (path === "/" || path === "") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function absolute(path: string): string {
  const normalized = withTrailingSlash(path);
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

/**
 * Every route returns static metadata at build time. The canonical URL is the
 * localised path; hreflang pairs the English and Chinese documents so search
 * engines never have to guess.
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
  const alternate = switchLocalePath(path, locale === "en" ? "zh" : "en");
  const other = locale === "en" ? "zh" : "en";

  return [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noIndex ? "noindex, follow" : "index, follow, max-image-preview:large",
    },
    { tagName: "link", rel: "canonical", href: url },
    {
      tagName: "link",
      rel: "alternate",
      hreflang: LOCALE_META[locale].htmlLang,
      href: url,
    },
    {
      tagName: "link",
      rel: "alternate",
      hreflang: LOCALE_META[other].htmlLang,
      href: absolute(alternate),
    },
    { tagName: "link", rel: "alternate", hreflang: "x-default", href: absolute(path.replace(/^\/zh/, "") || "/") },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "Lumo" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: LOCALE_META[locale].ogLocale },
    { property: "og:locale:alternate", content: LOCALE_META[other].ogLocale },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export function absoluteUrl(path: string): string {
  return absolute(path);
}
