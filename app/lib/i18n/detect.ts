import { getLocale, LOCALES, type Locale } from "@/lib/site-manifest";

/**
 * Locale detection and first-visit routing.
 *
 * Two rules keep this predictable:
 *  1. An explicit URL wins. A `/zh/...` path is never redirected away from, so
 *     a shared Chinese link opens in Chinese regardless of the browser.
 *  2. A stored preference wins over a guess, and only an *unprefixed* path is
 *     ever redirected. The redirect therefore can never loop: it always lands
 *     on a prefixed path, which rule 1 leaves alone.
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
  /** True when the document was reached from another page of this site. */
  internalNavigation?: boolean;
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
 * Deep links reached from inside this site are left alone: once someone is
 * reading English, the next link they click must not silently change language.
 * A direct entry (root, bookmark, shared link) is routed by preference, then by
 * `Accept-Language` equivalent.
 */
export function resolveLocaleRedirect({
  pathname,
  search = "",
  hash = "",
  preference,
  languages,
  internalNavigation = false,
  userAgent = "",
}: LocaleRedirectInput): string | null {
  if (isBotUserAgent(userAgent)) return null;
  if (isPrefixed(pathname)) return null;
  if (preference === "en") return null;
  if (!preference && internalNavigation && pathname !== "/") return null;

  const detected = preference ?? detectLocaleFromLanguages(languages);
  if (detected !== "zh") return null;
  if (getLocale(pathname) === "zh") return null;
  return localeHref(pathname, "zh", search, hash);
}

/**
 * Self-contained boot script, serialised into `<head>`.
 *
 * Kept free of imports and modern syntax that older Chromium can choke on; it
 * must run before the stylesheet so no English frame is ever painted.
 */
function localePreload() {
  try {
    var path = window.location.pathname;
    var search = window.location.search;
    var hash = window.location.hash;
    var ua = navigator.userAgent || "";
    if (
      /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headlesschrome|lighthouse|pagespeed/i.test(
        ua,
      ) ||
      navigator.webdriver
    ) {
      return;
    }
    if (path === "/zh" || path.indexOf("/zh/") === 0) return;

    var pref = null;
    try {
      pref = localStorage.getItem("lumo-site-locale");
    } catch (error) {
      pref = null;
    }
    if (pref !== "zh" && pref !== "en") pref = null;
    if (pref === "en") return;

    var internal =
      path !== "/" &&
      document.referrer.indexOf(window.location.origin + "/") === 0;
    if (!pref && internal) return;

    var detected = pref;
    if (!detected) {
      var languages = navigator.languages || [navigator.language || ""];
      for (var i = 0; i < languages.length; i += 1) {
        var tag = String(languages[i]).toLowerCase().replace(/_/g, "-");
        if (tag === "zh" || tag.indexOf("zh-") === 0) {
          detected = "zh";
          break;
        }
        if (tag === "en" || tag.indexOf("en-") === 0) {
          detected = "en";
          break;
        }
      }
    }

    if (detected !== "zh") return;
    window.location.replace("/zh" + (path === "/" ? "" : path) + search + hash);
  } catch (error) {
    /* A failed redirect must never block the page. */
  }
}

export const LOCALE_PRELOAD_SCRIPT = `(${localePreload.toString()})();`;
