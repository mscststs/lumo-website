import { describe, expect, it } from "vitest";
import {
  POSTER_CATALOG,
  POSTER_HEIGHT,
  POSTER_PRODUCTS,
  POSTER_WIDTH,
  posterCount,
} from "@/components/posters/poster-catalog";
import { posterComponent } from "@/components/posters/poster-registry";
import {
  fileSafeSlug,
  posterFileName,
  supportsHtmlInCanvas,
} from "@/lib/html-in-canvas";
import { en } from "@/lib/i18n/resources/en";
import { zh } from "@/lib/i18n/resources/zh";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function hasKey(resource: Json, key: string): boolean {
  return key.split(".").reduce<Json | undefined>((value, segment) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[segment];
    }
    return undefined;
  }, resource) !== undefined;
}

describe("poster catalogue", () => {
  it("keeps the 1280 × 800 canvas contract", () => {
    expect(POSTER_WIDTH).toBe(1280);
    expect(POSTER_HEIGHT).toBe(800);
    expect(POSTER_WIDTH / POSTER_HEIGHT).toBe(1.6);
  });

  it("publishes five uniquely identified posters per product", () => {
    for (const product of POSTER_PRODUCTS) {
      const entries = POSTER_CATALOG[product];
      expect(entries).toHaveLength(5);
      expect(posterCount(product)).toBe(5);
      expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
      for (const entry of entries) {
        expect(posterComponent(product, entry.id), `${product}/${entry.id}`).toBeDefined();
      }
    }
  });

  it("builds a product/name/index/locale download file name", () => {
    expect(posterFileName("lumo", "Agent loop", 2, "en")).toBe(
      "lumo-agent-loop-02-en.png",
    );
    expect(posterFileName("lumo-userscripts", "智能体端点", 3, "zh")).toBe(
      "lumo-userscripts-智能体端点-03-zh.png",
    );
    expect(fileSafeSlug("Models & privacy")).toBe("models-privacy");
  });

  it("detects HTML-in-Canvas safely in the test environment", () => {
    expect(supportsHtmlInCanvas()).toBe(false);
  });

  it("has a bilingual label for every poster", () => {
    for (const product of POSTER_PRODUCTS) {
      for (const entry of POSTER_CATALOG[product]) {
        expect(hasKey(en as unknown as Json, entry.labelKey), `en ${entry.labelKey}`).toBe(
          true,
        );
        expect(hasKey(zh as unknown as Json, entry.labelKey), `zh ${entry.labelKey}`).toBe(
          true,
        );
      }
    }
  });
});
