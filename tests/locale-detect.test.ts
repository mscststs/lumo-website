import { describe, expect, it } from "vitest";
import {
  detectLocaleFromLanguages,
  isBotUserAgent,
  localeFromLanguageTag,
  localeHref,
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

describe("first-visit routing", () => {
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

  it("never redirects away from an explicit /zh URL", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/zh/docs/mcp",
        preference: "en",
        languages: ["en-US"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("honours a stored preference over the browser language", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/lumo",
        preference: "zh",
        languages: ["en-US"],
        userAgent: CHROME_UA,
      }),
    ).toBe("/zh/lumo");
    expect(
      resolveLocaleRedirect({
        pathname: "/lumo",
        preference: "en",
        languages: ["zh-CN"],
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("leaves same-site deep links in the language being read", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/docs/mcp",
        preference: null,
        languages: ["zh-CN"],
        internalNavigation: true,
        userAgent: CHROME_UA,
      }),
    ).toBeNull();
  });

  it("routes a direct deep link by browser language", () => {
    expect(
      resolveLocaleRedirect({
        pathname: "/docs/mcp",
        search: "?q=tools",
        preference: null,
        languages: ["zh-CN"],
        userAgent: CHROME_UA,
      }),
    ).toBe("/zh/docs/mcp?q=tools");
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
