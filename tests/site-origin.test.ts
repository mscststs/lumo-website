import { readFileSync } from "node:fs";
import path from "node:path";
import type { MetaDescriptor } from "react-router";
import { describe, expect, it } from "vitest";
import { pageMeta } from "@/lib/seo";
import {
  isRewritableContentType,
  resolveSiteOrigin,
  rewriteOrigin,
  SITE_ORIGIN_PLACEHOLDER,
} from "@/lib/site-origin";

function attribute(
  descriptors: MetaDescriptor[],
  rel: string,
  hrefLang?: string,
): string | undefined {
  for (const descriptor of descriptors) {
    if ("rel" in descriptor && descriptor.rel === rel) {
      if (hrefLang && (!("hrefLang" in descriptor) || descriptor.hrefLang !== hrefLang)) {
        continue;
      }
      const href = descriptor.href;
      return typeof href === "string" ? href : undefined;
    }
  }
  return undefined;
}

describe("origin-agnostic absolute URLs", () => {
  it("uses a placeholder host that can never be a real deployment", () => {
    expect(SITE_ORIGIN_PLACEHOLDER).toBe("https://site.invalid");
  });

  it("rewrites every placeholder occurrence to the request origin", () => {
    const html = `<link rel="canonical" href="${SITE_ORIGIN_PLACEHOLDER}/docs/mcp/"><meta property="og:image" content="${SITE_ORIGIN_PLACEHOLDER}/brand/og.png">`;

    expect(rewriteOrigin(html, "https://lumo.app")).toBe(
      '<link rel="canonical" href="https://lumo.app/docs/mcp/"><meta property="og:image" content="https://lumo.app/brand/og.png">',
    );
  });

  it("leaves bodies without the placeholder untouched", () => {
    const html = `<link rel="canonical" href="https://lumo.app/docs/mcp/">`;
    expect(rewriteOrigin(html, "https://workers.dev")).toBe(html);
  });

  it("only rewrites textual responses", () => {
    expect(isRewritableContentType("text/html; charset=utf-8")).toBe(true);
    expect(isRewritableContentType("application/xml")).toBe(true);
    expect(isRewritableContentType("text/plain")).toBe(true);
    expect(isRewritableContentType("application/javascript")).toBe(false);
    expect(isRewritableContentType("image/png")).toBe(false);
    expect(isRewritableContentType(null)).toBe(false);
  });

  it("normalises an explicitly configured origin and ignores blanks", () => {
    expect(resolveSiteOrigin()).toBe(SITE_ORIGIN_PLACEHOLDER);
    expect(resolveSiteOrigin("   ")).toBe(SITE_ORIGIN_PLACEHOLDER);
    expect(resolveSiteOrigin("https://lumo.app/")).toBe("https://lumo.app");
  });

  it("keeps the sitemap script on the same placeholder", () => {
    const script = readFileSync(
      path.join(process.cwd(), "scripts", "build-sitemap.mjs"),
      "utf8",
    );
    expect(script).toContain(`"${SITE_ORIGIN_PLACEHOLDER}"`);
  });

  it("resolves canonical metadata against the live origin in the browser", () => {
    const meta = pageMeta({
      locale: "en",
      path: "/docs/mcp",
      title: "Model Context Protocol",
      description: "How Lumo speaks MCP.",
    });

    // No trailing slash: the asset layer redirects the slash form away, so the
    // canonical must describe the URL that is actually served.
    expect(attribute(meta, "canonical")).toBe(
      `${window.location.origin}/docs/mcp`,
    );
    expect(attribute(meta, "alternate", "zh-CN")).toBe(
      `${window.location.origin}/zh/docs/mcp`,
    );
    expect(attribute(meta, "alternate", "x-default")).toBe(
      `${window.location.origin}/docs/mcp`,
    );
  });
});
