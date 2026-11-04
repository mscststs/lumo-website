import type {
  DocProduct,
  DocSection,
  DocSlug,
  LumoDocSlug,
  UserscriptsDocSlug,
} from "@/lib/site-manifest";

export type CalloutTone = "note" | "tip" | "warning";

/**
 * Mockups are content, not decoration: an article names the screen it needs and
 * the renderer decides how that screen is drawn. Keeping the id in the block
 * model (instead of embedding JSX in copy) keeps content serialisable for
 * search, tests and translation parity.
 */
export const DOC_MOCK_IDS = [
  "lumo-chat",
  "lumo-models",
  "lumo-mcp",
  "lumo-extension-dialog",
  "chrome-extensions",
  "userscripts-dashboard",
  "userscripts-install",
  "userscripts-editor",
  "userscripts-agent",
  "userscripts-general",
  "agent-approval",
] as const;

export type DocMockId = (typeof DOC_MOCK_IDS)[number];

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
  | { type: "quote"; text: string; cite?: string }
  | { type: "mock"; id: DocMockId; caption?: string }
  | {
      type: "cards";
      items: { title: string; text: string; href: string; cta?: string }[];
    };

export interface DocArticle {
  product: DocProduct;
  slug: DocSlug;
  section: DocSection;
  title: string;
  description: string;
  updated: string;
  readingMinutes: number;
  blocks: DocBlock[];
}

export type DocCollection = {
  lumo: Record<LumoDocSlug, DocArticle>;
  userscripts: Record<UserscriptsDocSlug, DocArticle>;
};

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

/** Works for docs and for any other `DocBlock[]` document (privacy pages). */
export function getHeadings(source: { blocks: DocBlock[] }): DocHeading[] {
  return source.blocks
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
    case "mock":
      return block.caption ?? "";
    case "cards":
      return block.items
        .map((item) => `${item.title} ${item.text} ${item.cta ?? ""}`)
        .join(" ");
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
