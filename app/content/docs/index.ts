import {
  DOC_CATEGORIES,
  DOC_SLUGS,
  type DocCategory,
  type DocSlug,
  type Locale,
} from "@/lib/site-manifest";
import { en } from "./en";
import { zh } from "./zh";
import {
  getHeadings,
  type DocArticle,
  type DocBlock,
  type DocHeading,
} from "./types";

export const DOC_COLLECTIONS: Record<Locale, Record<DocSlug, DocArticle>> = {
  en,
  zh,
};

export function getDoc(locale: Locale, slug: string): DocArticle | undefined {
  if (!DOC_SLUGS.includes(slug as DocSlug)) return undefined;
  return DOC_COLLECTIONS[locale][slug as DocSlug];
}

export function getDocs(locale: Locale): DocArticle[] {
  return DOC_SLUGS.map((slug) => DOC_COLLECTIONS[locale][slug]);
}

export function getDocsByCategory(
  locale: Locale,
): { category: DocCategory; articles: DocArticle[] }[] {
  const docs = getDocs(locale);
  return DOC_CATEGORIES.map((category) => ({
    category,
    articles: docs.filter((doc) => doc.category === category),
  })).filter((group) => group.articles.length > 0);
}

export function getAdjacentDocs(
  locale: Locale,
  slug: string,
): { previous?: DocArticle; next?: DocArticle } {
  const docs = getDocs(locale);
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
  slug: DocSlug;
  title: string;
  description: string;
  category: DocCategory;
  heading?: string;
}

export function searchDocs(
  locale: Locale,
  query: string,
  limit = 10,
): DocSearchResult[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return getDocs(locale).slice(0, limit).map(toResult);

  const scored: { score: number; result: DocSearchResult }[] = [];

  for (const article of getDocs(locale)) {
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
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
  };
}

/** Everything the command palette needs, computed once per locale. */
export function getAllSearchResults(locale: Locale): DocSearchResult[] {
  return getDocs(locale).map(toResult);
}
