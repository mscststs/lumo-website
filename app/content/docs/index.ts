import {
  DOC_CATALOG,
  DOC_PRODUCTS,
  docSlugs,
  isDocProduct,
  isDocSlug,
  type DocProduct,
  type DocSection,
  type DocSlug,
  type Locale,
} from "@/lib/site-manifest";
import { en } from "./en";
import { zh } from "./zh";
import {
  getHeadings,
  type DocArticle,
  type DocBlock,
  type DocCollection,
  type DocHeading,
} from "./types";

export const DOC_COLLECTIONS: Record<Locale, DocCollection> = {
  en,
  zh,
};

function collectionFor(locale: Locale, product: DocProduct) {
  return DOC_COLLECTIONS[locale][product] as Record<string, DocArticle>;
}

export function getDoc(
  locale: Locale,
  product: DocProduct,
  slug: string,
): DocArticle | undefined {
  if (!isDocSlug(product, slug)) return undefined;
  return collectionFor(locale, product)[slug];
}

export function getDocs(locale: Locale, product: DocProduct): DocArticle[] {
  const collection = collectionFor(locale, product);
  return docSlugs(product)
    .map((slug) => collection[slug])
    .filter((article): article is DocArticle => Boolean(article));
}

export function getDocsBySection(
  locale: Locale,
  product: DocProduct,
): { section: DocSection; articles: DocArticle[] }[] {
  const collection = collectionFor(locale, product);
  return DOC_CATALOG[product]
    .map((group) => ({
      section: group.section,
      articles: group.slugs
        .map((slug) => collection[slug])
        .filter((article): article is DocArticle => Boolean(article)),
    }))
    .filter((group) => group.articles.length > 0);
}

export function getAdjacentDocs(
  locale: Locale,
  product: DocProduct,
  slug: string,
): { previous?: DocArticle; next?: DocArticle } {
  const docs = getDocs(locale, product);
  const index = docs.findIndex((doc) => doc.slug === slug);
  if (index < 0) return {};
  return {
    previous: index > 0 ? docs[index - 1] : undefined,
    next: index < docs.length - 1 ? docs[index + 1] : undefined,
  };
}

export function getDocHeadings(article: DocArticle): DocHeading[] {
  return getHeadings(article);
}

function stripInline(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function blockText(block: DocBlock): string {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
      return stripInline(block.text);
    case "ul":
    case "ol":
      return block.items.map(stripInline).join(" ");
    case "quote":
      return stripInline(block.text);
    case "callout":
      return `${block.title ?? ""} ${stripInline(block.text)}`;
    case "kv":
      return block.items.map((item) => `${item.k} ${item.v}`).join(" ");
    case "steps":
      return block.items
        .map((item) => `${item.title} ${stripInline(item.text)}`)
        .join(" ");
    case "table":
      return [...block.head, ...block.rows.flat()].map(stripInline).join(" ");
    case "mock":
      return block.caption ?? "";
    case "cards":
      return block.items
        .map((item) => `${item.title} ${stripInline(item.text)}`)
        .join(" ");
    case "code":
      return block.title ?? "";
    default:
      return "";
  }
}

export function articlePlainText(article: DocArticle): string {
  return article.blocks.map(blockText).join(" ").replace(/\s+/g, " ").trim();
}

export interface DocSearchResult {
  product: DocProduct;
  section: DocSection;
  slug: DocSlug;
  title: string;
  description: string;
  heading?: string;
}

function allDocs(locale: Locale): DocArticle[] {
  return DOC_PRODUCTS.flatMap((product) => getDocs(locale, product));
}

export function searchDocs(
  locale: Locale,
  query: string,
  limit = 10,
): DocSearchResult[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return allDocs(locale).slice(0, limit).map(toResult);

  const scored: { score: number; result: DocSearchResult }[] = [];

  for (const article of allDocs(locale)) {
    const title = article.title.toLowerCase();
    const description = article.description.toLowerCase();
    const body = articlePlainText(article).toLowerCase();

    let score = 0;
    let heading: string | undefined;
    if (title === needle) score += 200;
    if (title.startsWith(needle)) score += 120;
    if (title.includes(needle)) score += 80;
    if (description.includes(needle)) score += 40;

    const matchedHeading = getHeadings(article).find((entry) =>
      entry.text.toLowerCase().includes(needle),
    );
    if (matchedHeading) {
      score += 30;
      heading = matchedHeading.text;
    }
    if (body.includes(needle)) score += 8;

    if (score > 0) {
      scored.push({ score, result: { ...toResult(article), heading } });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((entry) => entry.result);
}

function toResult(article: DocArticle): DocSearchResult {
  return {
    product: article.product,
    section: article.section,
    slug: article.slug,
    title: article.title,
    description: article.description,
  };
}

/** Everything the command palette needs, computed once per locale. */
export function getAllSearchResults(locale: Locale): DocSearchResult[] {
  return allDocs(locale).map(toResult);
}

export function getDocCount(locale: Locale, product: DocProduct): number {
  return getDocs(locale, product).length;
}

/** Guard for route params that arrive as plain strings. */
export function resolveDocProduct(value: string | undefined): DocProduct | undefined {
  return isDocProduct(value) ? value : undefined;
}
