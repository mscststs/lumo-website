import { describe, expect, it } from "vitest";
import { PRIVACY_COLLECTIONS, getPrivacyDoc } from "@/content/privacy";
import { getHeadings, type DocBlock } from "@/content/docs/types";
import {
  DOC_SLUGS,
  LOCALES,
  PRIVACY_PATHS,
  privacyPath,
  PRODUCTS,
  type ProductId,
} from "@/lib/site-manifest";

const PRODUCT_IDS = PRODUCTS.map((product) => product.id);

/** Every block, flattened, as strings — for link and prose audits. */
function blockStrings(blocks: DocBlock[]): string[] {
  return blocks.flatMap((block) => {
    switch (block.type) {
      case "p":
      case "h2":
      case "h3":
        return [block.text];
      case "ul":
      case "ol":
        return block.items;
      case "quote":
        return [block.text, block.cite ?? ""];
      case "callout":
        return [block.title ?? "", block.text];
      case "steps":
        return block.items.flatMap((item) => [item.title, item.text]);
      case "kv":
        return block.items.flatMap((item) => [item.k, item.v]);
      case "table":
        return [...block.head, ...block.rows.flat()];
      default:
        return [];
    }
  });
}

describe("product privacy policies", () => {
  it("ships a policy for every product in every locale", () => {
    for (const locale of LOCALES) {
      for (const product of PRODUCT_IDS) {
        const doc = getPrivacyDoc(locale, product);
        expect(doc.product).toBe(product);
        expect(doc.title.length).toBeGreaterThan(0);
        expect(doc.summary.length).toBeGreaterThan(0);
        expect(doc.blocks.length).toBeGreaterThan(4);
        expect(doc.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it("keeps both languages structurally identical", () => {
    for (const product of PRODUCT_IDS) {
      const en = getPrivacyDoc("en", product);
      const zh = getPrivacyDoc("zh", product);
      expect(zh.updated).toBe(en.updated);
      expect(zh.blocks.map((block) => block.type)).toEqual(
        en.blocks.map((block) => block.type),
      );
      expect(getHeadings(zh).map((heading) => heading.level)).toEqual(
        getHeadings(en).map((heading) => heading.level),
      );
      expect(zh.blocks.length).toBe(en.blocks.length);
    }
  });

  it("gives every section a unique anchor", () => {
    for (const locale of LOCALES) {
      for (const product of PRODUCT_IDS) {
        const ids = getHeadings(getPrivacyDoc(locale, product)).map(
          (heading) => heading.id,
        );
        expect(ids.length).toBeGreaterThan(3);
        expect(new Set(ids).size).toBe(ids.length);
      }
    }
  });

  it("never stores a locale prefix and only links to pages that exist", () => {
    for (const locale of LOCALES) {
      for (const product of PRODUCT_IDS) {
        const text = blockStrings(getPrivacyDoc(locale, product).blocks).join("\n");
        expect(text).not.toMatch(/\]\(\/zh\//);
        for (const match of text.matchAll(/\]\((\/[^)]+)\)/g)) {
          const href = match[1] ?? "";
          // Internal links are site routes; product policies link to docs only.
          expect(href).toMatch(/^\/docs\//);
          const slug = href.replace(/^\/docs\//, "");
          expect(DOC_SLUGS).toContain(slug);
        }
      }
    }
  });

  it("owns its URL under the product namespace", () => {
    for (const product of PRODUCT_IDS) {
      expect(PRIVACY_PATHS[product]).toBe(`/${product}/privacy`);
      expect(privacyPath("zh", product)).toBe(`/zh/${product}/privacy`);
      expect(privacyPath("en", product)).toBe(`/${product}/privacy`);
    }
  });

  it("keeps the two products' policies distinct", () => {
    const titles = new Set(
      PRODUCT_IDS.map((product) => getPrivacyDoc("en", product).title),
    );
    expect(titles.size).toBe(PRODUCT_IDS.length);
    expect(PRIVACY_COLLECTIONS.en.lumo.title).not.toBe(
      PRIVACY_COLLECTIONS.en.userscripts.title,
    );
  });
});

/** Compile-time guard: the content model stays keyed by product id. */
const _productCheck: Record<ProductId, unknown> = {
  lumo: getPrivacyDoc("en", "lumo"),
  userscripts: getPrivacyDoc("en", "userscripts"),
};
void _productCheck;
