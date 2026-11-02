import { describe, expect, it } from "vitest";
import {
  DOC_COLLECTIONS,
  getAdjacentDocs,
  getDoc,
  getDocHeadings,
  getDocs,
  getDocsByCategory,
  searchDocs,
} from "@/content/docs";
import { DOC_CATEGORIES, DOC_SLUGS, LOCALES } from "@/lib/site-manifest";

describe("docs registry", () => {
  it("has every slug in both locales with the same block shape", () => {
    for (const locale of LOCALES) {
      const docs = getDocs(locale);
      expect(docs.map((doc) => doc.slug)).toEqual([...DOC_SLUGS]);
    }
    for (const slug of DOC_SLUGS) {
      const enDoc = DOC_COLLECTIONS.en[slug];
      const zhDoc = DOC_COLLECTIONS.zh[slug];
      expect(enDoc.blocks.map((block) => block.type)).toEqual(
        zhDoc.blocks.map((block) => block.type),
      );
    }
  });

  it("has complete, valid metadata", () => {
    for (const locale of LOCALES) {
      for (const doc of getDocs(locale)) {
        expect(doc.title.length).toBeGreaterThan(1);
        expect(doc.description.length).toBeGreaterThan(10);
        expect(DOC_CATEGORIES).toContain(doc.category);
        expect(doc.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(doc.readingMinutes).toBeGreaterThan(0);
        expect(doc.blocks.length).toBeGreaterThan(0);
      }
    }
  });

  it("generates unique heading ids in both locales", () => {
    for (const locale of LOCALES) {
      for (const doc of getDocs(locale)) {
        const ids = getDocHeadings(doc).map((heading) => heading.id);
        expect(new Set(ids).size, `${locale}/${doc.slug}`).toBe(ids.length);
      }
    }
  });

  it("exposes searchable, grouped and adjacent docs", () => {
    expect(searchDocs("en", "mcp").length).toBeGreaterThan(0);
    expect(searchDocs("zh", "MCP").length).toBeGreaterThan(0);
    expect(searchDocs("en", "no-such-token-xyz")).toHaveLength(0);
    expect(getDocsByCategory("en").length).toBeGreaterThan(0);
    const { previous, next } = getAdjacentDocs("en", "architecture");
    expect(previous?.slug).toBe("getting-started");
    expect(next?.slug).toBe("mcp");
    expect(getDoc("en", "not-real")).toBeUndefined();
  });
});
