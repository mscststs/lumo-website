import type { DocCategory, DocSlug } from "@/lib/site-manifest";

export type CalloutTone = "note" | "tip" | "warning";

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; title?: string; code: string }
  | { type: "callout"; tone: CalloutTone; title?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "kv"; items: { k: string; v: string }[] }
  | { type: "quote"; text: string; cite?: string };

export interface DocArticle {
  slug: DocSlug;
  category: DocCategory;
  title: string;
  description: string;
  updated: string;
  readingMinutes: number;
  blocks: DocBlock[];
}

export type DocCollection = Record<DocSlug, DocArticle>;

export interface DocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getHeadings(article: DocArticle): DocHeading[] {
  return article.blocks
    .filter(
      (block): block is Extract<DocBlock, { type: "h2" | "h3" }> =>
        block.type === "h2" || block.type === "h3",
    )
    .map((block) => ({
      id: slugifyHeading(block.text),
      text: block.text,
      level: block.type === "h2" ? 2 : 3,
    }));
}

function blockText(block: DocBlock): string {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "quote":
      return block.text;
    case "callout":
      return `${block.title ?? ""} ${block.text}`;
    case "kv":
      return block.items.map((item) => `${item.k} ${item.v}`).join(" ");
    case "steps":
      return block.items.map((item) => `${item.title} ${item.text}`).join(" ");
    case "table":
      return [...block.head, ...block.rows.flat()].join(" ");
    case "code":
      return "";
    default:
      return "";
  }
}

export function estimateReadingMinutes(blocks: DocBlock[]): number {
  const text = blocks.map(blockText).join(" ");
  const words = text.trim().split(/\s+/u).filter(Boolean).length;
  const cjk = (text.match(/[\u3400-\u9fff]/gu) ?? []).length;
  return Math.max(1, Math.round(words / 220 + cjk / 420));
}

/** Computes reading time once at module load and keeps article data terse. */
export function defineArticle(
  input: Omit<DocArticle, "readingMinutes"> & { readingMinutes?: number },
): DocArticle {
  return {
    ...input,
    readingMinutes: input.readingMinutes ?? estimateReadingMinutes(input.blocks),
  };
}
