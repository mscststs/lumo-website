import type { ProductId } from "@/lib/site-manifest";
import type { DocBlock } from "../docs/types";

/**
 * Product privacy policies.
 *
 * The source of truth is each product repository's `PRIVACY.md`; this file is
 * the typed, bilingual rendering of that document. `updated` mirrors the date
 * of the upstream file, so the page can never claim to be fresher than the
 * policy it publishes.
 */
export interface PrivacyDoc {
  product: ProductId;
  title: string;
  summary: string;
  /** ISO date of the upstream `PRIVACY.md` revision. */
  updated: string;
  blocks: DocBlock[];
}

export type PrivacyCollection = Record<ProductId, PrivacyDoc>;
