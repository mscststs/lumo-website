import { describe, expect, it } from "vitest";
import {
  DOC_PRODUCTS,
  docPath,
  docRoute,
  docSlugs,
  getLocale,
  hasLocalePrefix,
  isDocsPath,
  isExternalHref,
  isLocale,
  localePath,
  LOCALES,
  localePrefix,
  parseDocPath,
  productPath,
  SITE_ROUTES,
  stripLocale,
  switchLocaleHref,
  switchLocalePath,
} from "@/lib/site-manifest";

describe("locale-aware paths", () => {
  it("detects the locale from the first segment", () => {
    expect(getLocale("/")).toBe("en");
    expect(getLocale("/lumo")).toBe("en");
    expect(getLocale("/zh")).toBe("zh");
    expect(getLocale("/zh/docs/mcp")).toBe("zh");
    expect(getLocale("/english-looking-path")).toBe("en");
    expect(isLocale("zh")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("knows whether a path already carries a locale prefix", () => {
    expect(hasLocalePrefix("/zh/lumo")).toBe(true);
    expect(hasLocalePrefix("/zh")).toBe(true);
    expect(hasLocalePrefix("/lumo")).toBe(false);
    expect(hasLocalePrefix("/zhx/lumo")).toBe(false);
    expect(hasLocalePrefix("/")).toBe(false);
  });

  it("strips the locale prefix and trailing slashes", () => {
    expect(stripLocale("/zh")).toBe("/");
    expect(stripLocale("/zh/lumo")).toBe("/lumo");
    expect(stripLocale("/zh/lumo/")).toBe("/lumo");
    expect(stripLocale("/zh/docs/mcp/?q=1#top")).toBe("/docs/mcp");
    expect(stripLocale("/docs/mcp")).toBe("/docs/mcp");
    expect(stripLocale("/")).toBe("/");
  });

  it("localizes any path exactly once", () => {
    expect(localePath("en", "/lumo")).toBe("/lumo");
    expect(localePath("zh", "/lumo")).toBe("/zh/lumo");
    expect(localePath("zh", "/")).toBe("/zh");
    expect(localePath("en", "/")).toBe("/");
    // Idempotent: already-localized input is normalized, never double-prefixed.
    expect(localePath("zh", "/zh/lumo")).toBe("/zh/lumo");
    expect(localePath("en", "/zh/lumo")).toBe("/lumo");
    expect(localePath("zh", "/zh/")).toBe("/zh");
    expect(localePath("zh", "/lumo/")).toBe("/zh/lumo");
    // Query and hash survive.
    expect(localePath("zh", "/lumo?a=1#install")).toBe("/zh/lumo?a=1#install");
    expect(localePath("en", "/docs/mcp?q=x#api")).toBe("/docs/mcp?q=x#api");
    expect(localePath("zh", "lumo")).toBe("/zh/lumo");
    expect(localePrefix("zh")).toBe("/zh");
    expect(localePrefix("en")).toBe("");
  });

  it("round-trips every route and doc for every locale", () => {
    const paths = [
      ...Object.values(SITE_ROUTES),
      ...DOC_PRODUCTS.flatMap((product) =>
        docSlugs(product).map((slug) => docRoute(product, slug)),
      ),
    ];
    for (const locale of LOCALES) {
      for (const path of paths) {
        const localized = localePath(locale, path);
        expect(getLocale(localized)).toBe(locale);
        expect(stripLocale(localized)).toBe(path);
        expect(localePath(locale, localized)).toBe(localized);
      }
    }
  });

  it("switches language without losing the document, query or hash", () => {
    expect(switchLocalePath("/lumo", "zh")).toBe("/zh/lumo");
    expect(switchLocalePath("/zh/docs/mcp", "en")).toBe("/docs/mcp");
    expect(
      switchLocaleHref(
        { pathname: "/zh/docs/mcp", search: "?q=tools", hash: "#api" },
        "en",
      ),
    ).toBe("/docs/mcp?q=tools#api");
    expect(
      switchLocaleHref({ pathname: "/lumo", search: "", hash: "" }, "zh"),
    ).toBe("/zh/lumo");
  });

  it("builds product-scoped docs paths", () => {
    expect(docPath("en", "lumo", "overview")).toBe("/docs/lumo");
    expect(docPath("zh", "lumo", "mcp")).toBe("/zh/docs/lumo/mcp");
    expect(docPath("en", "userscripts", "agent-endpoint")).toBe(
      "/docs/userscripts/agent-endpoint",
    );
    expect(productPath("zh", "userscripts")).toBe("/zh/userscripts");
    expect(isDocsPath("/zh/docs")).toBe(true);
    expect(isDocsPath("/zh/lumo")).toBe(false);
  });

  it("parses a docs URL into its product and article", () => {
    expect(parseDocPath("/docs")).toBeUndefined();
    expect(parseDocPath("/docs/lumo")).toEqual({
      product: "lumo",
      slug: "overview",
    });
    expect(parseDocPath("/zh/docs/userscripts/agent-endpoint")).toEqual({
      product: "userscripts",
      slug: "agent-endpoint",
    });
    expect(parseDocPath("/docs/unknown")).toBeUndefined();
    expect(parseDocPath("/docs/lumo/not-real")).toBeUndefined();
  });

  it("separates internal targets from external ones", () => {
    expect(isExternalHref("/lumo")).toBe(false);
    expect(isExternalHref("/zh/docs/mcp")).toBe(false);
    expect(isExternalHref("//cdn.example.com/app.js")).toBe(true);
    expect(isExternalHref("https://github.com/mscststs")).toBe(true);
    expect(isExternalHref("mailto:hello@example.com")).toBe(true);
    expect(isExternalHref("#install")).toBe(true);
  });
});
