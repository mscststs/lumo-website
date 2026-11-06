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

/**
 * Documentation is product-scoped. A product owns its own reading order, its
 * own sections and its own table of contents; the only shared thing is the
 * block model, so search and translation parity can read every article.
 *
 * Slugs repeat across products on purpose (`overview`, `install`, `faq`,
 * `settings`) because they mean the same thing to a reader. Collections are
 * keyed by product first, then slug, so the repetition never collides.
 */
export const DOC_PRODUCTS = ["lumo", "userscripts"] as const;
export type DocProduct = (typeof DOC_PRODUCTS)[number];

export const LUMO_DOC_SLUGS = [
  "overview",
  "install",
  "models",
  "faq",
  "chat",
  "mcp",
  "extension-services",
  "webmcp",
  "settings",
  "data",
  "troubleshooting",
] as const;

export const USERSCRIPTS_DOC_SLUGS = [
  "overview",
  "install",
  "enable-userscripts",
  "faq",
  "install-scripts",
  "editor",
  "gm-api",
  "permissions",
  "updates-backup",
  "agent-endpoint",
  "diagnostics",
  "settings",
] as const;

export type LumoDocSlug = (typeof LUMO_DOC_SLUGS)[number];
export type UserscriptsDocSlug = (typeof USERSCRIPTS_DOC_SLUGS)[number];
export type DocSlug = LumoDocSlug | UserscriptsDocSlug;

/** Reading order is the navigation order: start → required setup → FAQ → features. */
export const DOC_SECTIONS = ["start", "faq", "features"] as const;
export type DocSection = (typeof DOC_SECTIONS)[number];

export const DOC_CATALOG = {
  lumo: [
    { section: "start", slugs: ["overview", "install", "models"] },
    { section: "faq", slugs: ["faq"] },
    {
      section: "features",
      slugs: [
        "chat",
        "mcp",
        "extension-services",
        "webmcp",
        "settings",
        "data",
        "troubleshooting",
      ],
    },
  ],
  userscripts: [
    { section: "start", slugs: ["overview", "install", "enable-userscripts"] },
    { section: "faq", slugs: ["faq"] },
    {
      section: "features",
      slugs: [
        "install-scripts",
        "editor",
        "gm-api",
        "permissions",
        "updates-backup",
        "agent-endpoint",
        "diagnostics",
        "settings",
      ],
    },
  ],
} as const satisfies Record<
  DocProduct,
  readonly { section: DocSection; slugs: readonly DocSlug[] }[]
>;

/** Flat, de-duplicated union — useful for route and content validation. */
export const DOC_SLUGS: readonly DocSlug[] = Array.from(
  new Set<DocSlug>([...LUMO_DOC_SLUGS, ...USERSCRIPTS_DOC_SLUGS]),
);

export function isDocProduct(value: string | undefined): value is DocProduct {
  return value === "lumo" || value === "userscripts";
}

export function docSlugs(product: DocProduct): readonly DocSlug[] {
  return DOC_CATALOG[product].flatMap((entry) => entry.slugs);
}

export function isDocSlug(product: DocProduct, slug: string): slug is DocSlug {
  return (docSlugs(product) as readonly string[]).includes(slug);
}

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

/**
 * Every internal page, written once in its locale-agnostic form.
 *
 * Navigation, the command palette, tests and the sitemap all read from here, so
 * a page can never be linked under two different paths. Locale prefixes are
 * added by `localePath` at the edge — never stored.
 */
export const SITE_ROUTES = {
  home: "/",
  lumo: "/lumo",
  userscripts: "/userscripts",
  posters: "/posters",
  docs: "/docs",
  notFound: "/404",
} as const;

export type SiteRoute = keyof typeof SITE_ROUTES;

/**
 * Legal pages are owned by a product, not by the site: each one publishes that
 * product repository's `PRIVACY.md` under the product's own namespace.
 */
export const PRIVACY_PATHS: Record<ProductId, string> = {
  lumo: "/lumo/privacy",
  userscripts: "/userscripts/privacy",
};

/** Locale prefix of a non-default locale, e.g. `{ zh: "/zh" }`. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Split a URL-ish string into pathname and the trailing `?search#hash`. */
function splitSuffix(path: string): { pathname: string; suffix: string } {
  const cut = path.search(/[?#]/);
  return cut < 0
    ? { pathname: path, suffix: "" }
    : { pathname: path.slice(0, cut), suffix: path.slice(cut) };
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "zh";
}

/** Locale encoded in the first path segment; English is unprefixed. */
export function getLocale(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

/** True when the path already carries a non-default locale prefix. */
export function hasLocalePrefix(pathname: string): boolean {
  const segment = pathname.split("/")[1] ?? "";
  return segment !== "" && isLocale(segment) && segment !== DEFAULT_LOCALE;
}

/**
 * Drop a non-default locale prefix while preserving the rest of the path.
 * Trailing slashes are removed: `/zh/docs/lumo/mcp/` and `/zh/docs/lumo/mcp` are the same
 * document, so they must produce the same locale-agnostic key.
 */
export function stripLocale(pathname: string): string {
  let clean = pathname.split(/[?#]/)[0] ?? "/";
  if (!clean.startsWith("/")) clean = `/${clean}`;
  const parts = clean.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0]) && parts[0] !== DEFAULT_LOCALE) {
    parts.shift();
  }
  return parts.length === 0 ? "/" : `/${parts.join("/")}`;
}

/**
 * Resolve any internal path to its canonical locale-specific form.
 *
 * Idempotent by design: already-prefixed input is normalized instead of being
 * prefixed twice, and `?query#hash` survives untouched. Every link in the app
 * goes through this one function, so there is exactly one place that knows how
 * a locale becomes a URL.
 */
export function localePath(locale: Locale, path = "/"): string {
  const { pathname, suffix } = splitSuffix(path);
  const clean = stripLocale(pathname.startsWith("/") ? pathname : `/${pathname}`);
  const localized = `${localePrefix(locale)}${clean === "/" ? "" : clean}` || "/";
  return `${localized}${suffix}`;
}

/** Keep the current document — path, query and hash — while switching language. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localePath(locale, pathname);
}

export function switchLocaleHref(
  url: { pathname: string; search?: string; hash?: string },
  locale: Locale,
): string {
  return localePath(
    locale,
    `${url.pathname}${url.search ?? ""}${url.hash ?? ""}`,
  );
}

/** Anything that does not start with a single `/` leaves the site. */
export function isExternalHref(href: string): boolean {
  return !href.startsWith("/") || href.startsWith("//");
}

export function isDocsPath(pathname: string): boolean {
  return stripLocale(pathname).startsWith("/docs");
}

export function docsPath(locale: Locale): string {
  return localePath(locale, "/docs");
}

/** Locale-agnostic docs route, for `LocaleLink` and content links. */
export function docRoute(product: DocProduct, slug: DocSlug): string {
  return slug === "overview" ? `/docs/${product}` : `/docs/${product}/${slug}`;
}

/** Product docs live under their own namespace; `overview` is the product root. */
export function docPath(
  locale: Locale,
  product: DocProduct,
  slug: DocSlug,
): string {
  return localePath(locale, docRoute(product, slug));
}

/** Parse a docs URL into its product and article. `/docs` has no product. */
export function parseDocPath(
  pathname: string,
): { product: DocProduct; slug: DocSlug } | undefined {
  const parts = stripLocale(pathname).split("/").filter(Boolean);
  if (parts[0] !== "docs") return undefined;
  const product = parts[1];
  if (!isDocProduct(product)) return undefined;
  const slug = parts[2] ?? "overview";
  if (!isDocSlug(product, slug)) return undefined;
  return { product, slug };
}

export function privacyPath(locale: Locale, product: ProductId): string {
  return localePath(locale, PRIVACY_PATHS[product]);
}

export function productPath(locale: Locale, product: ProductId): string {
  return localePath(
    locale,
    PRODUCTS.find((entry) => entry.id === product)?.path ?? "/",
  );
}
