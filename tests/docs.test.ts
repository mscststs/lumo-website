import { describe, expect, it } from "vitest";
import {
  getAdjacentDocs,
  getDoc,
  getDocHeadings,
  getDocs,
  getDocsBySection,
  searchDocs,
} from "@/content/docs";
import { DOC_MOCK_IDS } from "@/content/docs/types";
import {
  DOC_PRODUCTS,
  DOC_SECTIONS,
  docSlugs,
  LOCALES,
  type DocProduct,
} from "@/lib/site-manifest";

describe("docs registry", () => {
  it("has every product slug in both locales with the same block shape", () => {
    for (const locale of LOCALES) {
      for (const product of DOC_PRODUCTS) {
        const docs = getDocs(locale, product);
        expect(docs.map((doc) => doc.slug)).toEqual([...docSlugs(product)]);
      }
    }
    for (const product of DOC_PRODUCTS) {
      for (const slug of docSlugs(product)) {
        const enDoc = getDoc("en", product, slug);
        const zhDoc = getDoc("zh", product, slug);
        expect(enDoc, `${product}/${slug}`).toBeDefined();
        expect(zhDoc, `${product}/${slug}`).toBeDefined();
        expect(enDoc?.blocks.map((block) => block.type)).toEqual(
          zhDoc?.blocks.map((block) => block.type),
        );
      }
    }
  });

  it("has complete, product-scoped metadata", () => {
    for (const locale of LOCALES) {
      for (const product of DOC_PRODUCTS) {
        for (const doc of getDocs(locale, product)) {
          expect(doc.product).toBe(product);
          expect(DOC_SECTIONS).toContain(doc.section);
          expect(doc.title.length).toBeGreaterThan(1);
          expect(doc.description.length).toBeGreaterThan(10);
          expect(doc.blocks.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("generates unique heading ids in both locales", () => {
    for (const locale of LOCALES) {
      for (const product of DOC_PRODUCTS) {
        for (const doc of getDocs(locale, product)) {
          const ids = getDocHeadings(doc).map((heading) => heading.id);
          expect(new Set(ids).size, `${locale}/${product}/${doc.slug}`).toBe(
            ids.length,
          );
        }
      }
    }
  });

  it("exposes searchable, grouped and adjacent docs per product", () => {
    expect(searchDocs("en", "mcp").length).toBeGreaterThan(0);
    expect(searchDocs("zh", "MCP").length).toBeGreaterThan(0);
    expect(searchDocs("en", "no-such-token-xyz")).toHaveLength(0);

    for (const product of DOC_PRODUCTS) {
      const groups = getDocsBySection("en", product);
      expect(groups.length).toBeGreaterThan(0);
      for (const group of groups) {
        for (const article of group.articles) {
          expect(article.section).toBe(group.section);
        }
      }
    }

    const { previous, next } = getAdjacentDocs("en", "lumo", "models");
    expect(previous?.slug).toBe("install");
    expect(next?.slug).toBe("faq");

    expect(getDoc("en", "lumo", "not-real")).toBeUndefined();
    // Slugs are product-scoped: a Lumo article cannot be read as Userscripts.
    expect(getDoc("en", "userscripts", "models")).toBeUndefined();
  });

  it("only references known mocks and valid card targets", () => {
    for (const locale of LOCALES) {
      for (const product of DOC_PRODUCTS) {
        for (const doc of getDocs(locale, product)) {
          for (const block of doc.blocks) {
            if (block.type === "mock") {
              expect(DOC_MOCK_IDS).toContain(block.id);
            }
            if (block.type === "cards") {
              for (const item of block.items) {
                if (item.href.startsWith("/docs/")) {
                  const [hrefProduct, slug] = item.href
                    .replace(/^\/docs\//, "")
                    .split("/");
                  expect(DOC_PRODUCTS).toContain(hrefProduct);
                  if (slug) {
                    expect(docSlugs(hrefProduct as DocProduct)).toContain(slug);
                  }
                } else {
                  expect(item.href).toMatch(
                    /^\/(lumo|userscripts)\/privacy$/,
                  );
                }
              }
            }
          }
        }
      }
    }
  });

  it("keeps duplicate slug names isolated by product", () => {
    expect(getDoc("en", "lumo", "overview")?.product).toBe("lumo");
    expect(getDoc("en", "userscripts", "overview")?.product).toBe(
      "userscripts",
    );
    expect(getDoc("en", "lumo", "overview")?.title).not.toBe(
      getDoc("en", "userscripts", "overview")?.title,
    );
  });
});
