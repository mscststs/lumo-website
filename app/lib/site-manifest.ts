/**
 * Site-wide constants that must be safe to import from the React Router config,
 * route modules, tests and build scripts. Keep this file free of React, Vite
 * client APIs and other runtime-only imports.
 */

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  { label: string; nativeLabel: string; htmlLang: string; ogLocale: string }
> = {
  en: {
    label: "English",
    nativeLabel: "English",
    htmlLang: "en",
    ogLocale: "en_US",
  },
  zh: {
    label: "Chinese",
    nativeLabel: "简体中文",
    htmlLang: "zh-CN",
    ogLocale: "zh_CN",
  },
};

export const DOC_SLUGS = [
  "introduction",
  "getting-started",
  "architecture",
  "mcp",
  "agent-loop",
  "userscripts-runtime",
  "agent-connections",
  "design-system",
  "i18n",
  "deployment",
  "agent-protocol",
  "faq",
] as const;

export type DocSlug = (typeof DOC_SLUGS)[number];

export const DOC_CATEGORIES = [
  "start",
  "platform",
  "products",
  "engineering",
  "design",
] as const;

export type DocCategory = (typeof DOC_CATEGORIES)[number];

/** Product identity shared by navigation, cards, footer and cross-sell blocks. */
export const PRODUCTS = [
  {
    id: "lumo",
    path: "/lumo",
    mark: "spark",
    tone: "lumo",
  },
  {
    id: "userscripts",
    path: "/userscripts",
    mark: "braces",
    tone: "userscripts",
  },
] as const;

export type ProductId = (typeof PRODUCTS)[number]["id"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "zh";
}

/** Locale encoded in the first path segment; English is unprefixed. */
export function getLocale(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? "";
  return segment === "zh" ? "zh" : "en";
}

/** Drop a leading `/zh` while preserving the rest of the path. */
export function stripLocale(pathname: string): string {
  const clean = pathname.split("?")[0]?.split("#")[0] ?? "/";
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "zh") parts.shift();
  const rest = `/${parts.join("/")}`;
  return rest === "/" ? "/" : rest.replace(/\/$/, "");
}

/** Prefix an unprefixed path for a locale. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  return clean === "/" ? "/zh" : `/zh${clean}`;
}

/** Keep the current document while switching language. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localePath(locale, stripLocale(pathname));
}

export function isDocsPath(pathname: string): boolean {
  return stripLocale(pathname).startsWith("/docs");
}

export function docPath(locale: Locale, slug: DocSlug | "index"): string {
  return localePath(locale, slug === "index" ? "/docs" : `/docs/${slug}`);
}

export function productPath(locale: Locale, product: ProductId): string {
  return localePath(
    locale,
    PRODUCTS.find((entry) => entry.id === product)?.path ?? "/",
  );
}
