import { getLocale, LOCALES, type Locale } from "@/lib/site-manifest";

/**
 * Locale detection for the site's single entry point.
 *
 * The rule is deliberately narrow, because a language switcher that fires on
 * every navigation is worse than no detection at all: **the URL owns the
 * language**. `/zh/...` is Chinese, `/...` is English, and neither is ever
 * rewritten. Only `/` — a path that carries no language information — picks one
 * for a first-time visitor.
 *
 * Resolution order at `/`:
 *  1. The stored preference (written by the language menu and by every rendered
 *     page, so it always matches the language last read).
 *  2. The referrer, when it is a same-origin page (continuity for visitors whose
 *     storage is unavailable).
 *  3. `navigator.languages`.
 *
 * Detection runs from a tiny inline script in `<head>`, before the first paint,
 * so the English pre-render never flashes on a Chinese browser.
 */

export const LOCALE_STORAGE_KEY = "lumo-site-locale";

export interface LocaleRedirectInput {
  pathname: string;
  search?: string;
  hash?: string;
  /** Explicit choice previously stored by the language menu or a locale visit. */
  preference: Locale | null;
  /** `navigator.languages`, most preferred first. */
  languages: readonly string[];
  /** Locale of the same-origin page that linked here, if any. */
  referrerLocale?: Locale | null;
  userAgent?: string;
}

/** Map a BCP 47 tag (or a legacy `zh_CN` tag) onto a supported locale. */
export function localeFromLanguageTag(tag: string): Locale | null {
  const normalized = tag.trim().toLowerCase().replace(/_/g, "-");
  if (!normalized) return null;
  if (normalized === "zh" || normalized.startsWith("zh-")) return "zh";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  return null;
}

/** First supported language in the browser's preference order. */
export function detectLocaleFromLanguages(
  languages: readonly string[],
): Locale | null {
  for (const tag of languages) {
    const locale = localeFromLanguageTag(tag);
    if (locale) return locale;
  }
  return null;
}

export function normalizeLocalePreference(value: unknown): Locale | null {
  return (LOCALES as readonly unknown[]).includes(value)
    ? (value as Locale)
    : null;
}

/** Read the stored choice, tolerating private mode and hand-edited values. */
export function readLocalePreference(): Locale | null {
  try {
    return normalizeLocalePreference(
      window.localStorage.getItem(LOCALE_STORAGE_KEY),
    );
  } catch {
    return null;
  }
}

/**
 * Persist the choice. Also mirrored into a cookie so a future Cloudflare Worker
 * (or an analytics boundary) can read it without executing JS.
 */
export function writeLocalePreference(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage unavailable: the current URL still carries the locale.
  }
  try {
    document.cookie = `${LOCALE_STORAGE_KEY}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {
    // Cookies disabled: same reasoning as above.
  }
}

const BOT_UA =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headlesschrome|lighthouse|pagespeed/i;

/** Never redirect a crawler: it must see the canonical language of the URL. */
export function isBotUserAgent(userAgent: string): boolean {
  return BOT_UA.test(userAgent);
}

function isPrefixed(pathname: string): boolean {
  return pathname === "/zh" || pathname.startsWith("/zh/");
}

/** Prefix an unprefixed path, preserving query and hash. */
export function localeHref(
  pathname: string,
  locale: Locale,
  search = "",
  hash = "",
): string {
  const target = locale === "zh" ? `/zh${pathname === "/" ? "" : pathname}` : pathname;
  return `${target}${search}${hash}`;
}

/**
 * The href to redirect to, or `null` to render the requested document.
 *
 * Only `/` can be redirected: it is the one path with no language of its own.
 * Every other URL keeps the language it declares, so opening an English link in
 * a new tab can never land on the Chinese page (and vice versa) just because of
 * a stored preference.
 */
export function resolveLocaleRedirect({
  pathname,
  search = "",
  hash = "",
  preference,
  languages,
  referrerLocale = null,
  userAgent = "",
}: LocaleRedirectInput): string | null {
  if (isBotUserAgent(userAgent)) return null;
  if (pathname !== "/") return null;
  if (isPrefixed(pathname)) return null;

  const detected =
    preference ?? referrerLocale ?? detectLocaleFromLanguages(languages);
  if (detected !== "zh") return null;
  if (getLocale(pathname) === "zh") return null;
  return localeHref(pathname, "zh", search, hash);
}

/**
 * Self-contained boot script, inlined into `<head>`.
 *
 * Kept as a literal string rather than `fn.toString()`: the server and client
 * bundles are transformed independently, so a serialized function body can
 * differ by whitespace between the pre-rendered HTML and the hydrating client
 * and trip React's hydration check. A constant is byte-identical everywhere.
 *
 * It mirrors `resolveLocaleRedirect` exactly: only `/` may be redirected, and
 * only to `/zh`. `tests/locale-detect.test.ts` executes this script against a
 * fake window to keep the two implementations honest.
 */
export const LOCALE_PRELOAD_SCRIPT = `(function () {
  try {
    var path = window.location.pathname;
    if (path !== "/") return;
    var ua = navigator.userAgent || "";
    if (/bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headlesschrome|lighthouse|pagespeed/i.test(ua) || navigator.webdriver) return;
    var pref = null;
    try { pref = localStorage.getItem("lumo-site-locale"); } catch (error) { pref = null; }
    if (pref !== "zh" && pref !== "en") pref = null;
    if (pref === "en") return;
    var referrerLocale = null;
    var origin = window.location.origin;
    if (document.referrer.indexOf(origin + "/") === 0) {
      var rest = document.referrer.slice(origin.length);
      var cut = rest.search(/[?#]/);
      var referrerPath = cut < 0 ? rest : rest.slice(0, cut);
      referrerLocale = referrerPath === "/zh" || referrerPath.indexOf("/zh/") === 0 ? "zh" : "en";
    }
    var detected = pref || referrerLocale;
    if (!detected) {
      var languages = navigator.languages || [navigator.language || ""];
      for (var i = 0; i < languages.length; i += 1) {
        var tag = String(languages[i]).toLowerCase().replace(/_/g, "-");
        if (tag === "zh" || tag.indexOf("zh-") === 0) { detected = "zh"; break; }
        if (tag === "en" || tag.indexOf("en-") === 0) { detected = "en"; break; }
      }
    }
    if (detected !== "zh") return;
    window.location.replace("/zh" + window.location.search + window.location.hash);
  } catch (error) {
    /* A failed redirect must never block the page. */
  }
})();`;
