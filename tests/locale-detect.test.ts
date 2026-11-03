import { describe, expect, it } from "vitest";
import {
  detectLocaleFromLanguages,
  isBotUserAgent,
  localeFromLanguageTag,
  localeHref,
  LOCALE_PRELOAD_SCRIPT,
  LOCALE_STORAGE_KEY,
  normalizeLocalePreference,
  resolveLocaleRedirect,
} from "@/lib/i18n/detect";

const CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

describe("locale detection", () => {
  it("maps language tags including legacy underscore forms", () => {
    expect(localeFromLanguageTag("zh")).toBe("zh");
    expect(localeFromLanguageTag("zh-CN")).toBe("zh");
    expect(localeFromLanguageTag("zh_Hans_CN")).toBe("zh");
    expect(localeFromLanguageTag("en-GB")).toBe("en");
    expect(localeFromLanguageTag("fr-FR")).toBeNull();
    expect(localeFromLanguageTag("")).toBeNull();
  });

  it("takes the first supported language, not the last", () => {
    expect(detectLocaleFromLanguages(["fr-FR", "zh-CN", "en-US"])).toBe("zh");
    expect(detectLocaleFromLanguages(["en-US", "zh-CN"])).toBe("en");
    expect(detectLocaleFromLanguages(["ja-JP", "ko-KR"])).toBeNull();
  });

  it("normalises a stored preference", () => {
    expect(normalizeLocalePreference("zh")).toBe("zh");
    expect(normalizeLocalePreference("en")).toBe("en");
    expect(normalizeLocalePreference("fr")).toBeNull();
    expect(normalizeLocalePreference(null)).toBeNull();
  });

  it("builds a prefixed href without losing query or hash", () => {
    expect(localeHref("/", "zh")).toBe("/zh");
    expect(localeHref("/lumo", "zh", "?a=1", "#agent")).toBe("/zh/lumo?a=1#agent");
    expect(localeHref("/lumo", "en")).toBe("/lumo");
  });
});

describe("entry-point routing", () => {
  it("sends a Chinese browser from the English root to /zh", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: null,
        languages: ["zh-CN", "en"],
        userAgent: CHROME_UA,
      }),
    ).toBe("/zh");
  });

  it("keeps an English browser on the English root", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: null,
        languages: ["en-US"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("never redirects away from a language-specific URL", () => {
    for (const pathname of ["/zh", "/zh/docs/mcp", "/zh/lumo"]) {
      expect(
        resolveLocaleRedirect({
          pathname,
          preference: "en",
          languages: ["en-US"],
          userAgent: CHROME_UA,
        }),
      ).toBeNull();
    }
  });

  it("honours a stored preference at the root", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: "zh",
        languages: ["en-US"],
        userAgent: CHROME_UA,
      }),
    ).toBe("/zh");
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: "en",
        languages: ["zh-CN"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("keeps the language of the linking page when storage is unavailable", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: null,
        referrerLocale: "zh",
        languages: ["en-US"],
        userAgent: CHROME_UA,
      }),
    ).toBe("/zh");
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: null,
        referrerLocale: "en",
        languages: ["zh-CN"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("preserves the query and hash of the root entry", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        search: "?ref=launch",
        hash: "#install",
        preference: "zh",
        languages: ["en-US"],
        userAgent: CHROME_UA,
      }),
    ).toBe("/zh?ref=launch#install");
  });

  it("never rewrites a deep link, whatever the preference says", () => {
    // The URL owns the language: an English link opened in a new tab must stay
    // English even for a visitor who reads Chinese.
    expect(
      resolveLocaleRedirect({
        pathname: "/docs/mcp",
        search: "?q=tools",
        preference: "zh",
        languages: ["zh-CN"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
    expect(
      resolveLocaleRedirect({
        pathname: "/lumo",
        preference: "zh",
        languages: ["zh-CN"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("never redirects crawlers", () => {
    const bot =
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
    expect(isBotUserAgent(bot)).toBe(true);
    expect(
      resolveLocaleRedirect({
        pathname: "/",
        preference: null,
        languages: ["zh-CN"],
        userAgent: bot,
      }),
    ).toBeNull();
  });
});

/**
 * Execute the shipped inline script against a fake window. The script and
 * `resolveLocaleRedirect` must agree, otherwise pre-render and hydration would
 * disagree about the entry point.
 */
function runPreloadScript({
  pathname,
  search = "",
  hash = "",
  preference = null,
  languages = ["en-US"],
  userAgent = CHROME_UA,
  referrer = "",
  webdriver = false,
}: {
  pathname: string;
  search?: string;
  hash?: string;
  preference?: string | null;
  languages?: string[];
  userAgent?: string;
  referrer?: string;
  webdriver?: boolean;
}): string | null {
  const replaced: string[] = [];
  const origin = "https://lumo.example";
  const fakeWindow = {
    location: {
      pathname,
      search,
      hash,
      origin,
      replace: (url: string) => replaced.push(url),
    },
  };
  const fakeNavigator = { userAgent, languages, webdriver };
  const fakeStorage = {
    getItem: (key: string) => (key === LOCALE_STORAGE_KEY ? preference : null),
  };

  new Function(
    "window",
    "document",
    "navigator",
    "localStorage",
    LOCALE_PRELOAD_SCRIPT,
  )(fakeWindow, { referrer }, fakeNavigator, fakeStorage);

  return replaced[0] ?? null;
}

describe("inline boot script", () => {
  it("routes a Chinese browser from the root to /zh", () => {
    expect(runPreloadScript({ pathname: "/", languages: ["zh-CN"] })).toBe("/zh");
  });

  it("keeps a stored English choice", () => {
    expect(
      runPreloadScript({ pathname: "/", preference: "en", languages: ["zh-CN"] }),
    ).toBeNull();
  });

  it("preserves the query and hash of the root entry", () => {
    expect(
      runPreloadScript({
        pathname: "/",
        search: "?ref=launch",
        hash: "#install",
        languages: ["zh-CN"],
      }),
    ).toBe("/zh?ref=launch#install");
  });

  it("never rewrites a deep link, even with a Chinese preference", () => {
    expect(
      runPreloadScript({ pathname: "/docs/mcp", preference: "zh", languages: ["zh-CN"] }),
    ).toBeNull();
    expect(
      runPreloadScript({ pathname: "/lumo", preference: "zh", languages: ["zh-CN"] }),
    ).toBeNull();
  });

  it("follows the linking page when no choice is stored", () => {
    expect(
      runPreloadScript({
        pathname: "/",
        languages: ["en-US"],
        referrer: "https://lumo.example/zh/docs/mcp",
      }),
    ).toBe("/zh");
    expect(
      runPreloadScript({
        pathname: "/",
        languages: ["zh-CN"],
        referrer: "https://lumo.example/docs/mcp",
      }),
    ).toBeNull();
  });

  it("skips crawlers and automated browsers", () => {
    const bot =
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
    expect(runPreloadScript({ pathname: "/", languages: ["zh-CN"], userAgent: bot })).toBeNull();
    expect(runPreloadScript({ pathname: "/", languages: ["zh-CN"], webdriver: true })).toBeNull();
  });
});
